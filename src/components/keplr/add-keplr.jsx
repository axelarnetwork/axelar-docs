export default ({ environment = "mainnet", chain }) => {
  const addNetwork = async (settingsPromise) => {
    try {
      const settings = await settingsPromise;
      try {
        await window.keplr.enable(settings.chainId);
        alert(settings.chainId + " already added");
      } catch (e) {
        console.log(
          "Unable to connect to wallet natively, so trying experimental chain"
        );
        try {
          await window.keplr.experimentalSuggestChain(settings);
          await window.keplr.enable(settings.chainId);
        } catch (e2) {
          console.log(
            "and yet there is a problem in trying to do that too",
            e2
          );
        }
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        alert(
          "There was a syntax error. Please correct it and try again: " +
            error.message
        );
      } else {
        throw error;
      }
    }
  };

  return (
    <button
      onClick={() => {
        console.log("network and chain", environment, chain);
        const settings = import(
          `../../data/keplr/${environment}/${chain}.json`
        );
        console.log("got back settings", settings);
        addNetwork(settings);
      }}
      className="flex keplr-button"
    >
      <img src="/images/wallets/keplr.png" alt="" width={16} height={16} />
    </button>
  );
};
