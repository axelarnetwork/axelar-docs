# Rotation of mnemonics in tofnd

Starting from `axelard` `v0.17.1` and `tofnd` `v0.10.0`, validators can update their `tofnd` mnemonic and slowly rotate out their old mnemonics for better security practices. New Axelar key rotations will automatically use the most recent `tofnd` mnemonic. Validators need to keep their old `tofnd` mnemonics until the network considers the old keys inactive. For each chain, olld keys are considered inactive after `x` subsequent key rotations on that chain. (Currently `x=7`.)

```bash
# Kill vald/tofnd processes
pkill -f "vald"
pkill -f "tofnd"

# Rotate tofnd mnemonic
tofnd -m rotate -d ~/.axelar/.tofnd

# Note: Keep the old mnemonic backups around

# BACKUP the new exported mnemonic and then DELETE the local copy
mv $TOFND_HOME/export ..
rm $TOFND_HOME/export

# Restart vald/tofnd processes
```

## Recovery of mnmenonics

`tofnd` mnemonics can be recovered by importing the latest mnemonic with `tofnd -m import` as before. But to recover the old mnemonics, continue running `tofnd -m import` with each one of the old mnemonics.
