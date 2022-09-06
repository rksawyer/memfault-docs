#!/bin/bash

if grep -r -n --color -e 'memfault/memfault-linux-sdk/\(blob\|tree\)/[^-]\{1\}' docs; then
  echo "Please use '.../blob/-/...' links! The '-' makes Github automatically redirect to the default branch."
  exit 1
fi

if grep -r -n --color -e 'memfault/memfault-linux-sdk/tree/-/' docs; then
  echo "Please use '.../blob/-/...' links! Using '.../tree/-/...' does not work!"
  exit 1
fi
