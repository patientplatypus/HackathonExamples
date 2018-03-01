#!/bin/bash
go get -u github.com/gorilla/mux
go get github.com/rs/cors
cd backendBLOK
go get github.com/patientplatypus/GoBackendFinancialBlockchain
go build main.go
./main
#might need go run main.go
#or: go build main.go / ./main
