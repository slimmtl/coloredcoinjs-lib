import { expect } from 'chai'
import _ from 'lodash'
import { pseudoRandomBytes as getRandomBytes } from 'crypto'

import cclib from '../../../src'

export default function (opts) {
  let StorageCls = cclib.storage.data[opts.clsName]
  if (StorageCls === undefined) {
    return
  }

  let ldescribe = opts.describe || describe
  if (!StorageCls.isAvailable()) {
    ldescribe = xdescribe
  }

  ldescribe('storage.data.' + opts.clsName, () => {
    let storage

    let records = _.times(2).map(() => {
      return {
        colorCode: 'epobc',
        txId: getRandomBytes(32).toString('hex'),
        outIndex: 2,
        colorId: 1,
        value: 10
      }
    })
    records[1].txId = records[0].txId
    records[1].outIndex += 1

    beforeEach(() => {
      storage = new StorageCls(opts.clsOpts)
      return storage.ready
    })

    afterEach(() => {
      return storage.clear()
    })

    describe('#add', () => {
      it('same output for given color id already exists', async () => {
        await storage.add(records[0])

        let newRecord = _.defaults({
          value: records[0].value + 1
        }, records[0])

        await expect(storage.add(newRecord)).to.be.rejectedWith(cclib.errors.Storage.ColorData.HaveAnotherValue)
      })
    })

    describe('#get', () => {
      beforeEach(() => {
        return Promise.all(records.map((record) => {
          return storage.add(record)
        }))
      })

      it('output not exists', async () => {
        let txId = getRandomBytes(32).toString('hex')
        let data = await storage.get({txId: txId})
        expect(Array.from(data.keys())).to.have.length(0)
      })

      it('output exists', async () => {
        let opts = {colorCode: records[0].colorCode, txId: records[0].txId}
        let data = await storage.get(opts)
        expect(Array.from(data.keys())).to.have.length(2)
        expect(Array.from(data.get(records[0].outIndex).keys())).to.have.length(1)
        expect(data.get(records[0].outIndex).get(records[0].colorId)).to.equal(records[0].value)
        expect(Array.from(data.get(records[1].outIndex).keys())).to.have.length(1)
        expect(data.get(records[1].outIndex).get(records[1].colorId)).to.equal(records[1].value)
      })

      it('output exists, specific outIndex', async () => {
        let opts = {
          colorCode: records[0].colorCode,
          txId: records[0].txId,
          outIndex: records[0].outIndex
        }
        let data = await storage.get(opts)
        expect(Array.from(data.keys())).to.have.length(1)
        expect(Array.from(data.get(records[0].outIndex).keys())).to.have.length(1)
        expect(data.get(records[0].outIndex).get(records[0].colorId)).to.equal(records[0].value)
      })
    })

    describe('#remove', () => {
      it('add/get/delete/get (by color code and txid)', async () => {
        let record = records[0]
        await storage.add(record)

        let opts = {
          colorCode: record.colorCode,
          txId: record.txId,
          outIndex: record.outIndex
        }
        let data = await storage.get(opts)
        expect(Array.from(data.keys())).to.have.length(1)
        expect(Array.from(data.get(record.outIndex).keys())).to.have.length(1)
        expect(data.get(record.outIndex).get(record.colorId)).to.equal(record.value)

        opts = {colorCode: record.colorCode, txId: record.txId}
        await storage.remove(opts)

        data = await storage.get(opts)
        expect(Array.from(data.keys())).to.have.length(0)
      })

      it('add/get/delete/get (by color id)', async () => {
        let record = records[0]
        await storage.add(record)

        let opts = {
          colorCode: record.colorCode,
          txId: record.txId,
          outIndex: record.outIndex
        }
        let data = await storage.get(opts)
        expect(Array.from(data.keys())).to.have.length(1)
        expect(Array.from(data.get(record.outIndex).keys())).to.have.length(1)
        expect(data.get(record.outIndex).get(record.colorId)).to.equal(record.value)

        opts = {colorId: record.colorId}
        await storage.remove(opts)

        data = await storage.get({colorCode: record.colorCode, txId: record.txId})
        expect(Array.from(data.keys())).to.have.length(0)
      })
    })
  })
}
