#!/bin/bash

dir_key=/home/edison/Documents/androidkeys/mykey.keystore
dir_app=/home/edison/Documents/integradora/alojamientos_app/src-cordova/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk

key_alias=mykey

npm run build:android

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $dir_key $dir_app $key_alias
