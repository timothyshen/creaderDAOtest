<template>
  <div class="upload-img-root">
    <el-select v-show="connected" v-model="selectedSymbol" class="m-2" placeholder="Select" size="large">
      <el-option
          v-for="symbol in symbols"
          :key="symbol"
          :label="`${symbol} ${balanceStack[symbol]}`"
          :value="symbol"
      />
    </el-select>
    <span v-if="connected">{{ balance }}</span>
    <el-upload v-show="connected"
               :file-list="fileList"
               :show-file-list="false"
               :auto-upload="false"
               :on-change="handleChangeFileSuccess"
               :on-success="handleAvatarSuccess"
               drag
               multiple
               action="#"
               class="avatar-uploader"
    >
      <i class="el-icon-upload"/>
      <div class="el-upload__text">Drag the file here，or<em style="color: #031425;"> Click to upload</em></div>
    </el-upload>
    <div>
      <ul>
        <li v-for="(order, index) in orders"
            :key="index">
          <a style="margin-right:10px;" target="_blank" :href="`${arseedUrl}/${order.itemId}`">{{ order.itemId }}</a>
          <a target="_blank" :href="`https://arweave.net/${order.itemId}`">By arweave gateway(when onChainStatus pending
            or success)
          </a>
          <div>{{ JSON.stringify(order, null, 2) }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import pubsub from 'pubsub-js'
import Everpay from 'everpay'
import {getBundleFee, getOrders} from 'arseeding-js'
import Bignumber from 'bignumber.js'
import {createAndSubmitItem} from "arseeding-js/cjs/submitOrder";

// import {payOrder} from "arseeding-js/cjs/payOrder";
function getArseedUrl() {
  let arseedUrl = "https://arseed.web3infra.dev"
  const hostname = window.location.hostname
  if (hostname.split(".")[0].indexOf("dev") !== -1 || hostname === "localhost") { // test env
    arseedUrl = "https://arseed-dev.web3infra.dev"
  }
  return arseedUrl
}

export default {
  name: 'Upload',
  data() {
    return {
      fileList: [],
      submitResp: "",
      selectedSymbol: '',
      symbols: [],
      connected: false,
      instance: {},
      everpay: {},
      balance: '',
      orders: [],
      balanceStack: {},
      arseedUrl: getArseedUrl()
    };
  },
  watch: {
    selectedSymbol() {
      if (this.everpay.balance && this.selectedSymbol && window.ethereum.selectedAddress) {
        this.everpay.balance({
          symbol: this.selectedSymbol,
          account: window.ethereum.selectedAddress
        }).then(result => {
          this.balance = result
        })
      }
    }
  },
  methods: {
    handleChangeFileSuccess(file, fileList) {
      this.combineFileList(fileList);
    },
    handleAvatarSuccess(res, file, fileList) {
      this.combineFileList(fileList);
    },
    async combineFileList(files) {
      const file = files[files.length - 1]
      console.log('file.size', file.size)

      const fee = await getBundleFee(this.arseedUrl, file.size, this.selectedSymbol)
      const formatedFee = new Bignumber(fee.finalFee).dividedBy(new Bignumber(10).pow(fee.decimals)).toString()
      if (+this.balance >= +formatedFee) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file.raw);
        reader.onload = async () => {
          const data = reader.result
          const ops = {
            tags: [{name: "FileName", value: file.name}, {name: "Content-Type", value: file.raw.type}]
          }
          const res = await this.instance.sendAndPay(this.arseedUrl, data, this.selectedSymbol, ops)
          console.log(res)

          // ----------- for test bug----------------
          const cfg = {
            signer: this.instance.signer,
            path: "",
            arseedUrl: 'https://arseed.web3infra.dev',
            currency: 'AR'
          }
          const ords = await createAndSubmitItem(data, ops, cfg)
          console.log('oooood', ords)
          // const pay = new Everpay({
          //   account: this.instance.signer.address,
          //   chainType: 'ethereum' as any,
          //   ethConnectedSigner: this.instance.signer
          // })
          //
          // const tx = await payOrder(pay,ords)
          // console.log('tttxxx',tx)
          // ----------------------------
          this.submitResp = JSON.stringify(res)
          this.getOrders()
        }
      } else {
        alert(`need ${formatedFee} ${this.selectedSymbol} to upload`)
      }
    },
    async getOrders() {
      getOrders(this.arseedUrl, window.ethereum.selectedAddress).then(orders => {
        this.orders = orders
      })
    },
    intervalUpdateOrders() {
      setTimeout(() => {
        this.getOrders()
        this.intervalUpdateOrders()
      }, 10000)
    },
    async getBalances() {
      this.everpay.balances({
        account: window.ethereum.selectedAddress
      }).then(balances => {
        const balanceStack = {}
        balances.forEach(balanceItem => {
          balanceStack[balanceItem.symbol] = balanceItem.balance
        })
        this.balanceStack = balanceStack
      })
    }
  },
  mounted() {
    this.everpay = new Everpay()
    this.everpay.info().then(info => {
      this.symbols = info.tokenList.map(token => token.symbol)
      this.selectedSymbol = this.symbols[0]
    })

    this.pubId = pubsub.subscribe('connected', async (msgName, data) => {
      this.connected = true
      this.instance = data
      this.getOrders()
      this.intervalUpdateOrders()
      this.getBalances()
    })
  },
  beforeDestroy() {
    pubsub.unsubscribe(this.pubId)
  },
};
</script>
