// Used to save .Simpl files, converts import lines to the code from the hidden textfield
function saveButton(s) {
    //Getting value from hiden html element and spliting in lines
    var importCode = $("#importCode").val();
    var importSplit = importCode.split("\n");
    //map to save imports in
    var imports = {};

    var activeImport = "";
    for (line in importSplit) {
        // if it starts with import try to save all future lines until a line starts with importEnd
        if (importSplit[line].includes("import ")){
            importSplit[line]=importSplit[line].replace("import ","");
            imports[importSplit[line]] = "import "+importSplit[line];
            activeImport = importSplit[line];
        }else if (importSplit[line].includes("importEnd ")){
            imports[activeImport] += "\n"+importSplit[line];
            activeImport = "";
        }else{
            if (activeImport !=""){
                imports[activeImport] += "\n"+importSplit[line];
            }
        }
    };
    var toSave = $("#code").val();
    if (imports.length!=0){
        //replace imports with the code for the import
        for (var k in imports){
            if (toSave.includes("import "+k)){
                toSave = toSave.replace("import "+k,imports[k])
            }
        };
    }
    var blob = new Blob([toSave], {type: "text/plain;charset=utf-8"});
    saveAs(blob, s+".Simpl");
};

function saveConsoleButton() {
    var blob = new Blob([$("#console").val()], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "Console.log");
};