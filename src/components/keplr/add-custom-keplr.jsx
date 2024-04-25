export default ({
  providedSettings = null,
  title = "Add Custom Chain Config",
}) => {
  let settings;
  const addNetwork = async () => {
    if (!providedSettings) {
      let field = document.getElementById("keplr_wallet_json_configuration");
      console.log("field", field);

      // re-layout the field
      try {
        const ugly = field.value;
        document.getElementById("keplr_wallet_json_configuration").value =
          JSON.stringify(JSON.parse(ugly), undefined, 4);
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

      try {
        settings = JSON.parse(field.value);
      } catch (error) {
        if (error instanceof SyntaxError) {
          alert(
            "There was a syntax error. Please correct it and try again: " +
              error.message
          );
        } else {
          alert(error.message);
        }
      }
    } else {
      settings = providedSettings;
    }
    console.log("settings were determined to be", settings);

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
        alert("Invalid Keplr JSON configuration. " + e2.message);
        console.log("and yet there is a problem in trying to do that too", e2);
      }
    }
  };

  return (
    <button onClick={() => addNetwork()} className="flex keplr-button">
      {title}
      <img src="/images/wallets/keplr.png" alt="" width={16} height={16} />
    </button>
  );
};
