'use client';
import KeplrConfigInput from '../textarea';
import AddKeplrButton from './addKeplrWallet';

const FIELD_ID = 'keplr_wallet_json_configuration';

async function addCustomNetwork() {
  const field = document.getElementById(FIELD_ID);

  try {
    field.value = JSON.stringify(JSON.parse(field.value), undefined, 4);
  } catch (error) {
    alert(
      'There was a syntax error. Please correct it and try again: ' +
        error.message,
    );
    return;
  }

  const settings = JSON.parse(field.value);
  try {
    await window.keplr.enable(settings.chainId);
    alert(settings.chainId + ' already added');
  } catch {
    try {
      await window.keplr.experimentalSuggestChain(settings);
      await window.keplr.enable(settings.chainId);
    } catch (e) {
      alert('Invalid Keplr JSON configuration. ' + e.message);
    }
  }
}

export default function KeplrCustomNetwork() {
  return (
    <>
      <KeplrConfigInput />
      <AddKeplrButton
        buttonTitle="Validate Input & Add to Keplr"
        onClick={addCustomNetwork}
      />
    </>
  );
}
