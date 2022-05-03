# tofnd Mnemonic Rotation

Rotate out tofnd mnemonics.

Starting from `axelard` `v0.17.1` and `tofnd` `v0.10.0`, validators can
update their tofnd mnemonic and slowly rotate out their old mnemonics
to increase security. New key rotations will start using the new mnemonic.
However, validators need to keep their old tofnd mnemonics around until
the network considers the old keys inactive. This occurs after there have
been x (currently the param is 7) key rotations for each chain.

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

`tofnd recovery`: tofnd can be recovered by importing the latest
mnemonic with `tofnd -m import -d [home]` as before.
But to recover the old mnemonics, continue running
`tofnd -m import ...` with each one of the old mnemonics.
