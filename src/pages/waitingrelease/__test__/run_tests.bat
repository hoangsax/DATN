@echo off
REM This script will run your Jest tests 100 times
for /l %%x in (1, 1, 100) do (
   echo Running test iteration: %%x
   yarn test --forceExit
)
