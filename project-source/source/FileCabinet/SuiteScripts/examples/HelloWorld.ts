/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */

import {EntryPoints} from "N/types";
import * as log from "N/log";

export const onRequest: EntryPoints.Suitelet.onRequest = (context) => {

    log.debug({
        title: "Hello World",
        details: "This is a sample SuiteScript 2.1 file"
    });

    context.response.write({
        output: JSON.stringify({
            message: "Hello from NetSuite!",
            accountId: context.request.parameters.accountId
        })
    });
};

