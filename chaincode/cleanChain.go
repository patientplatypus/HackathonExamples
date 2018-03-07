/*
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
*/

package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	pb "github.com/hyperledger/fabric/protos/peer"
)

// Chaincode example simple Chaincode implementation
type Chaincode struct {
}

// ===================================================================================
// New, Modify action
// ===================================================================================
type objectLineageObj struct {
	ObjectType string `json:"objType"`  //objType is used to distinguish the various types of objects in state database
	ObjectID   string `json:"objectID"` // object ID
	Attr1      string `json:"attr1"`    // attribute 1
	Action     string `json:"action"`   // action: new, modify
	Attr2      string `json:"attr2"`    // attribute 2
	Attr3      string `json:"attr3"`    // attribute 3
	Attr4      int    `json:"attr4"`    // attribute 4
	Attr5      string `json:"attr5"`    // attribute 5
	Attr6      string `json:"attr6"`    // attribute 6
	Attr7      string `json:"attr7"`    // attribute 7
	Attr8      string `json:"attr8"`    // attribute 8
}

// ===================================================================================
// Main
// ===================================================================================
func main() {
	err := shim.Start(new(Chaincode))
	if err != nil {
		fmt.Printf("Error starting File Trace chaincode: %s", err)
	}
}

// Init initializes chaincode
// ===========================
func (t *Chaincode) Init(stub shim.ChaincodeStubInterface) pb.Response {
	return shim.Success(nil)
}

// Invoke - Our entry point for Invocations
// ========================================
func (t *Chaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {
	function, args := stub.GetFunctionAndParameters()
	fmt.Println("invoke is running " + function)

	// Handle different functions
	if function == "insertObject" { //insert an object into the ledger
		return t.insertObject(stub, args)
	} else if function == "modifyObject" { //modify an attribute of an object
		return t.modifyObject(stub, args)
	} else if function == "getObjectHistory" {
		return t.getObjectHistory(stub, args)
	}

	fmt.Println("invoke did not find func: " + function) //error
	return shim.Error("Received unknown function invocation")
}

// ===========================================================
// insertObject: create a new object lineage
// ===========================================================
func (t *Chaincode) insertObject(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	//   0       		1      		2     	3		   4			5	       6			7			8
	// "ObjectID", "Attr1", "Attr2", "Attr3", "Attr4", "Attr5", "Attr6","Attr7","Attr8"
	if len(args) < 9 {
		return shim.Error("Incorrect number of arguments. Expecting 9")
	}

	// ==== Input sanitation ====
	fmt.Println("- start init insertObject")
	if len(args[0]) <= 0 {
		return shim.Error("1st argument must be a non-empty string")
	}
	if len(args[1]) <= 0 {
		return shim.Error("2nd argument must be a non-empty string")
	}
	if len(args[2]) <= 0 {
		return shim.Error("3rd argument must be a non-empty string")
	}
	if len(args[3]) <= 0 {
		return shim.Error("4th argument must be a non-empty string")
	}
	if len(args[5]) <= 0 {
		return shim.Error("6th argument must be a non-empty string")
	}
	if len(args[6]) <= 0 {
		return shim.Error("7th argument must be a non-empty string")
	}
	if len(args[7]) <= 0 {
		return shim.Error("8th argument must be a non-empty string")
	}
	if len(args[8]) <= 0 {
		return shim.Error("9th argument must be a non-empty string")
	}

	objectID := args[0]
	attr1 := strings.ToLower(args[1])
	attr2 := strings.ToLower(args[2])
	attr3 := strings.ToLower(args[3])

	attr4, err := strconv.Atoi(args[4])
	if err != nil {
		return shim.Error("5th argument must be a numeric string")
	}

	attr5 := strings.ToLower(args[5])
	attr6 := args[6]
	attr7 := strings.ToLower(args[7])
	attr8 := strings.ToLower(args[8])

	fmt.Println("- start insertObject ", objectID)

	attr5, err = t.objectLineageHelper(stub, objectID, attr1, "new", attr2, attr3, attr4, attr5, attr6, attr7, attr8)
	if err != nil {
		return shim.Error(attr5 + err.Error())
	} else if attr5 != "" {
		return shim.Error(attr5)
	}

	fmt.Println("- end insertObject (success)")
	return shim.Success(nil)
}

// ===========================================================
// modifyObject: modifies existing object lineage
// ===========================================================
func (t *Chaincode) modifyObject(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	//   0       		1      		2     	3		   4			5	       6			7			8
	// "ObjectID", "Attr1", "Attr2", "Attr3", "Attr4", "Attr5", "Attr6","Attr7","Attr8"
	if len(args) < 9 {
		return shim.Error("Incorrect number of arguments. Expecting 9")
	}

	// ==== Input sanitation ====
	fmt.Println("- start init modifyObject")
	if len(args[0]) <= 0 {
		return shim.Error("1st argument must be a non-empty string")
	}
	if len(args[1]) <= 0 {
		return shim.Error("2nd argument must be a non-empty string")
	}
	if len(args[2]) <= 0 {
		return shim.Error("3rd argument must be a non-empty string")
	}
	if len(args[3]) <= 0 {
		return shim.Error("4th argument must be a non-empty string")
	}
	if len(args[5]) <= 0 {
		return shim.Error("6th argument must be a non-empty string")
	}
	if len(args[6]) <= 0 {
		return shim.Error("7th argument must be a non-empty string")
	}
	if len(args[7]) <= 0 {
		return shim.Error("8th argument must be a non-empty string")
	}
	if len(args[8]) <= 0 {
		return shim.Error("9th argument must be a non-empty string")
	}

	objectID := args[0]
	attr1 := strings.ToLower(args[1])
	attr2 := strings.ToLower(args[2])
	attr3 := strings.ToLower(args[3])

	attr4, err := strconv.Atoi(args[4])
	if err != nil {
		return shim.Error("5th argument must be a numeric string")
	}

	attr5 := strings.ToLower(args[5])
	attr6 := args[6]
	attr7 := strings.ToLower(args[7])
	attr8 := strings.ToLower(args[8])

	fmt.Println("- start modifyObject ", objectID)

	attr5, err = t.objectLineageHelper(stub, objectID, attr1, "modify", attr2, attr3, attr4, attr5, attr6, attr7, attr8)
	if err != nil {
		return shim.Error(attr5 + err.Error())
	} else if attr5 != "" {
		return shim.Error(attr5)
	}

	fmt.Println("- end modifyObject (success)")
	return shim.Success(nil)
}

// ===========================================================
// objectLineageHelper : helper method for objectLineageObj
// ===========================================================
func (t *Chaincode) objectLineageHelper(stub shim.ChaincodeStubInterface,
	objectID string,
	attr1 string,
	action string,
	attr2 string,
	attr3 string,
	attr4 int,
	attr5 string,
	attr6 string,
	attr7 string,
	attr8 string) (string, error) {

	// attempt to load existing object lineage
	objLineageAsBytes, err := stub.GetState(objectID)

	if action == "new" {
		// if object lienage already exists, fail
		if objLineageAsBytes != nil {
			return "Object already exists with ID:" + objectID, err
		}

		objectType := "objectLineageObj"
		objectLineage := &objectLineageObj{objectType, objectID, attr1, action, attr2, attr3, attr4, attr5, attr6, attr7, attr8}
		documentLineageJSONasBytes, err := json.Marshal(objectLineage)
		if err != nil {
			return "", err
		}

		// === Save object lineage to state ===
		err = stub.PutState(objectID, documentLineageJSONasBytes)
		if err != nil {
			return "", err
		}
	} else {
		// attempt to get the current object object by objectID.
		// if sucessful, returns us a byte array we can then us JSON.parse to unmarshal
		fmt.Println("Modifying object lineage with objectID: " + objectID)
		if err != nil {
			return "Failed to get object lineage:", err
		} else if objLineageAsBytes == nil {
			return "Object lineage does not exist", err
		}

		objectLineageToModify := objectLineageObj{}
		err = json.Unmarshal(objLineageAsBytes, &objectLineageToModify) //unmarshal it aka JSON.parse()
		if err != nil {
			return "", err
		}

		// Update lineage information
		objectLineageToModify.Action = action
		objectLineageToModify.Attr4 = attr4
		objectLineageToModify.Attr8 = attr8
		objectLineageToModify.Attr6 = attr6
		objectLineageToModify.Attr1 = attr1
		objectLineageToModify.Attr5 = attr5
		objectLineageToModify.Attr3 = attr3
		objectLineageToModify.Attr7 = attr7
		objectLineageToModify.Attr2 = attr2

		lineageAsJSONBytes, _ := json.Marshal(objectLineageToModify)
		err = stub.PutState(objectID, lineageAsJSONBytes) //rewrite the object lineage
		if err != nil {
			return "", err
		}
	}

	return "", nil
}

// ===========================================================================================
// getObjectHistory returns the historical state transitions for a given key of a record
// ===========================================================================================
func (t *Chaincode) getObjectHistory(stub shim.ChaincodeStubInterface, args []string) pb.Response {

	if len(args) < 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	recordKey := args[0]

	fmt.Printf("- start getObjectHistory: %s\n", recordKey)

	resultsIterator, err := stub.GetHistoryForKey(recordKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing historic values for the key/value pair
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"TxId\":")
		buffer.WriteString("\"")
		buffer.WriteString(response.TxId)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Value\":")
		// if it was a delete operation on given key, then we need to set the
		//corresponding value null. Else, we will write the response.Value
		//as-is (as the Value itself a JSON vehiclePart)
		if response.IsDelete {
			buffer.WriteString("null")
		} else {
			buffer.WriteString(string(response.Value))
		}

		buffer.WriteString(", \"Timestamp\":")
		buffer.WriteString("\"")
		buffer.WriteString(time.Unix(response.Timestamp.Seconds, int64(response.Timestamp.Nanos)).String())
		buffer.WriteString("\"")

		buffer.WriteString(", \"IsDelete\":")
		buffer.WriteString("\"")
		buffer.WriteString(strconv.FormatBool(response.IsDelete))
		buffer.WriteString("\"")

		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- getObjectHistory returning:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}
