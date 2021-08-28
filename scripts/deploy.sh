#! /bin/bash

ssh -T lian 'rm -rf /home/lian/static/liuli-browser/*'
scp -r dist/* lian:/home/lian/static/liuli-browser/