const Remote = require("@swtc/rpc").Remote;
const jlib = require('@swtc/lib');
const Wallet = jlib.Wallet;
const remote = new Remote({server: "https://srje115qd43qw2.swtc.top"})

const main = async() => {
  try {
/**
   * generate jingtum wallet
   */
  const swtcWallet = Wallet.generate();
  console.log("井通钱包:", swtcWallet);

 /**
   * 实例化 Remote
   */
   const remoteInst = remote.config();
   console.log("Remote实例:", remoteInst);

 /**
   * 获取节点信息
   */
   const serverInfo = await remote.rpcServerInfo();
   console.log("节点信息:", serverInfo);

 /**
   * 获取节点状态
   */
  const serverState = await remote.rpcServerState();
  console.log("节点状态:", serverState);

  /**
   * 获取已关闭帐本信息
   */
  const ledgerClosed = await remote.rpcLedgerClosed();
  console.log("已关闭帐本信息:", ledgerClosed);

  /**
   * 获取当前帐本信息
   */
  const ledgerCurrent = await remote.rpcLedgerCurrent();
  console.log("当前帐本信息:", ledgerCurrent);

  /**
   * 获取帐本列表
   * params IRpcLedgerOptions
   */
  const ledger = await remote.rpcLedger({ledger_index: "current", ledger_hash: "1121194D1955C25EA44165EE53AC64708FE27ABCFDAFA913FCCD218F716463C8"});
  console.log("帐本列表:", ledger);

  /**
   * 获取帐本数据
   * params IRpcLedgerDataOptions
   */
  const ledgerData = await remote.rpcLedgerData({limit: 1, binary: true});
  console.log("帐本数据:", ledgerData);

   /**
   * 获取帐本数据
   * params IRpcLedgerEntryOptions
   */
  const ledgerData1 = await remote.rpcLedgerEntry({type: "account_root", account_root: "jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz"});
  console.log("帐本数据:", ledgerData1);

  /**
   * 获取最近事务列表
   * params IRpcTxHistoryOptions
   */
  const txHistory = await remote.rpcTxHistory();
  console.log("事务列表:", txHistory);

  /**
   * 获取事务内容
   * params IRpcTxOptions
   */
  const tx = await remote.rpcTx({transaction: '667EE210E55FF31D043CECAF831F3131411DFA9CA8B0BDE0DCE3EA57883B27E8'});
  console.log("事务内容:", tx);

  /**
   * 从特定帐本获取事务内容
   * params IRpcTxEntryOptions
   */
  const tx1 = await remote.rpcTxEntry({ledger_hash:"D56B1A2527F39512773348F0F367C101CA6941EC32E3EB757533FFFA8EB9EB7E", tx_hash: "0A2F2D4E139B726E84690711992148BF04E2A8C4FE6339D2F040F86FC1ABBB9B"});
  console.log("特定事务内容:", tx1);

  /**
   * 提交单签事务
   * params IRpcSubmitOptions
   */
  const sign = await remote.rpcSubmit({tx_blob: "12000022000000002400000EA4614000000002160EC068400000000000000A732103E466DB080F3863F354E9C1B1CA0927175B338C41789ACFC0EFAD50301524C23E7446304402200A1F6E65FD9D7076E4589C5BA13E2433B1C2CA9E7C0E42EFC7D57F22C74B1B780220355A2456589B79FD6D6185FD5A74BDE44CFB10E0F6711E4A3BF86FE531C72E6C81141C3D155BB13D3FE79CBF85E5C1DCB6B508079ABE83140ECD295EA24E99608A9B346838EB991BCF143E62F9EA7C06737472696E677D00E1F1"});
  console.log("提交单签事务:", sign);

  /**
   * 提交多签事务
   * params IRpcSubmitMultisignedOptions
   */
const tx_json = {
    Flags: 0,
    Fee: 20000,
    TransactionType: "Payment",
    Account: "jVnqw7H46sjpgNFzYvYWS4TAp13NKQA1D",
    Amount: "1000000",
    Destination: "jLXCzapdDd1K11EtUv4Nz4agj8DPVbARjk",
    Sequence: 11,
    Signers: [
            {
            Signer: {
              Account: "jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz",
              SigningPubKey: "029110C3744FB57BD1F4824F5B989AE75EB6402B4365B501F6EDCA9BE44A675E15",
               TxnSignature: "3045022100D788CFBD76BB183D43E175191BD37965D01EFDD9D7F978B4DC7AED1F6421CA5B0220334448FEAF2A153EEF24FDFB7E4BC90BFFB29EBEB32342CEA3234F4737E9C967"
             }
            },
            {
             Signer: {
               Account: "jfdqBEDsbk3eMSXX2t7CGeu2RPkEjHs6ie",
               SigningPubKey: "0261DD84455B92BDFD59C1DB2A5BD9CE1A3AF0FD531A08EEB2EE354C3BB230B878",
               TxnSignature: "3045022100FC692AF1374D347C7E53205F165EF7F9AD3F96F558A2BE339947E277AB74447102204B8103DCA38AEC05A1EFD65C4E635242E882449B98328EAF13DC0DD2AFC0F239"
              }
            }
       ],
    SigningPubKey: ""
}
  const Multisign = await remote.rpcSubmitMultisigned({tx_json});
  console.log("提交多签事务:", Multisign);

  /**
   * 获取交易两种通证的挂单
   * params IRpcBookOffersOptions
   */
  const bookOffers = await remote.rpcBookOffers({taker_pays: {currency: "SWT", issuer: ""}, taker_gets: {currency: "CNY", issuer: "jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or"}, limit: 1});
  console.log("挂单:", bookOffers);

  /**
   * 获取两个账户间的交易路径
   * params IRpcSkywellPathFindOptions
   */
  // const path = await remote.rpcSkywellPathFind({
  //   destination_account: "jGxW97eCqxfAWvmqSgNkwc2apCejiM89bG",
  //   source_account: "jGxW97eCqxfAWvmqSgNkwc2apCejiM89bG",
  //   destination_amount: remote.makeAmount(1, "cny"),
  //   source_currencies: [ remote.makeCurrency("vcc"), remote.makeCurrency("jcc") ]
  // });
  // console.log("交易路径:", path);

  /**
   * 获取黑名单列表信息
   * params IRpcBlacklistInfoOptions
   */
  const blackListInfo = await remote.rpcBlacklistInfo();
  console.log("黑名单列表信息:", blackListInfo);

  /**
   * 获取账户基本信息
   * params IRpcAccountInfoOptions
   */
  const accountInfo = await remote.rpcAccountInfo({account: "jRGRHy6T5W3CeoWzpHuGnAMeF17tG6WBx"});
  console.log("账户基本信息:", accountInfo);

  // const accountInfo = await remote.getAccountInfo("jRGRHy6T5W3CeoWzpHuGnAMeF17tG6WBx",{ledger_index:"current"});
  // console.log("账户基本信息:", accountInfo);


  /**
   * 获取账户扩展信息
   * params IRpcAccountObjectsOptions
   */
  const accountObject = await remote.rpcAccountObjects({account: "jpmKEm2sUevfpFjS7QHdT8Sx7ZGoEXTJAz"});
  console.log("账户扩展信息:", accountObject);

  /**
   * 获取账户可发送/接收token
   * params IRpcAccountCurrenciesOptions
   */
  const accountCurrency = await remote.rpcAccountCurrencies({account: "jRGRHy6T5W3CeoWzpHuGnAMeF17tG6WBx"});
  console.log("账户可接受和发送的币种:", accountCurrency);

  /**
   * 获取账户信任线
   * params IRpcAccountLinesOptions
   */
  const accountLines = await remote.rpcAccountLines({account: "jRGRHy6T5W3CeoWzpHuGnAMeF17tG6WBx"});
  console.log("账户信任线:", accountLines);

  /**
   * 获取账户挂单
   * params IRpcAccountOffersOptions
   */
  // const accountOffers = await remote.rpcAccountOffers({account: "jGxW97eCqxfAWvmqSgNkwc2apCejiM89bG"});
  // console.log("账户挂单:", accountOffers);

  const accountOffers = await remote.getAccountOffers("jRGRHy6T5W3CeoWzpHuGnAMeF17tG6WBx", { limit: 1 });
  console.log("账户挂单:", accountOffers);

  /**
   * 获取账户事务
   * params IRpcAccountTxOptions
   */
  const accountTxs = await remote.rpcAccountTx({account: "jRGRHy6T5W3CeoWzpHuGnAMeF17tG6WBx", limit: 3});
  console.log("账户事务:", accountTxs);

  /**
   * 获取账户关系
   * params IRpcAccountRelationOptions
   */
  const accountRelation = await remote.rpcAccountRelation({account: "jRGRHy6T5W3CeoWzpHuGnAMeF17tG6WBx"});
  console.log("账户关系:", accountRelation);

  /**
   * 获取账户资产
   * params account
   */
  const account = "jRGRHy6T5W3CeoWzpHuGnAMeF17tG6WBx";
  const accountBalance = await remote.getAccountBalances(account);
  console.log("账户资产:", accountBalance);

  } catch(error) {
    console.log(error)
  }
}

main()


