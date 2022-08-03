# Add a custom network to Keplr
import Button from '../../components/addKeplrWallet'

<label 
    htmlFor="keplr_wallet_json_configuration" 
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
>
    Keplr Wallet stringified JSON configuration (Axelar testnet placeholder below)
</label>
<textarea id="keplr_wallet_json_configuration" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='{"rpc":"https://axelartest-rpc.quickapi.com:443","rest":"https://axelartest-lcd.quickapi.com:443","chainId":"axelar-testnet-lisbon-3","chainName":"Axelar","stakeCurrency":{"coinDenom":"AXL","coinMinimalDenom":"uaxl","coinDecimals":6},"bech32Config":{"bech32PrefixAccAddr":"axelar","bech32PrefixAccPub":"axelarpub","bech32PrefixValAddr":"axelarvaloper","bech32PrefixValPub":"axelarvaloperpub","bech32PrefixConsAddr":"axelarvalcons","bech32PrefixConsPub":"axelarvalconspub"},"bip44":{"coinType":118},"currencies":[{"coinDenom":"AXL","coinMinimalDenom":"uaxl","coinDecimals":6}],"feeCurrencies":[{"coinDenom":"AXL","coinMinimalDenom":"uaxl","coinDecimals":6}],"gasPriceStep":{"low":0.05,"average":0.125,"high":0.2},"features":["stargate","no-legacy-stdTx","ibc-transfer"]}'></textarea>

<Button buttonTitle="Validate JSON" onClick={() => {
    var ugly = document.getElementById('keplr_wallet_json_configuration').value;
    var obj = JSON.parse(ugly);
    var pretty = JSON.stringify(obj, undefined, 4);
    document.getElementById('keplr_wallet_json_configuration').value = pretty;
}}></Button>

<Button buttonTitle="Add to Keplr" onClick={async (data) => {
    const field = document.getElementById("keplr_wallet_json_configuration");
    let settings = null;

    try {
        settings = JSON.parse(field.value);
        console.log("settings",settings);

        try {
            await window.keplr.enable(settings.chainId)
        } catch (e) {
            console.log("Unable to connect to wallet natively, so trying experimental chain")
            try {
                await window.keplr.experimentalSuggestChain(settings)
                await window.keplr.enable(settings.chainId)
            } catch (e2) {
                console.log("and yet there is a problem in trying to do that too", e2)
            }
        }

    }
    catch (error) {
        if (error instanceof SyntaxError) {
            alert("There was a syntax error. Please correct it and try again: " + error.message);
        }
        else {
            throw error;
        }
    }
}}></Button>