@echo off
SET fileName=%1
if defined fileName (
    echo export file %fileName%
    call sendSalaryEmail.py %fileName%
) else ( echo "Usage: run.bat <fileName>" )


Pause