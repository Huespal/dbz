var vmModule = require("./main-view-model"),
    layout = require("ui/layouts/stack-layout"),
    imageModule = require("ui/image"),
    labelModule = require("ui/label"),
    gesturesModule = require("ui/gestures"),
    ImageSourceModule = require("image-source"),
    enumsModule = require("ui/enums"),
    soundModule = require("nativescript-sound"),
    searchBarModule = require("ui/search-bar"),
    dialogModule = require("ui/dialogs"),
    sounds = {},
    page = null,
    loaded = false;
function pageLoaded(args) {
    page = args.object;
    var characters = [{name: "Goku", imageName: "goku", soundName: ["goku"]},
                      {name: "Vegeta", imageName: "vegeta", soundName: ["vegeta"]},
                      {name: "Bulma", imageName: "bulma", soundName: ["bulma"]},
                      {name: "Krilin", imageName: "krilin", soundName: ["krilin"]},
                      {name: "Follet Tortuga", imageName: "follet", soundName: ["follet"]},
                      {name: "Mr. Boo", imageName: "boogordo", soundName: ["boogordo"]},
                      {name: "Cèl·lula", imageName: "celula", soundName: ["celula"]},
                      {name: "Cor Petit", imageName: "corpetit", soundName: ["corpetit"]},
                      {name: "Freezer", imageName: "freezer", soundName: ["freezer"]},
                      {name: "Goku nen", imageName: "gokupetit", soundName: ["gokupetit"]},
                      {name: "Guineu (Pilaf)", imageName: "guineu", soundName: ["guineu"]},
                      {name: "Kaito", imageName: "kaito", soundName: ["kaito"]},
                      {name: "O'olong", imageName: "oolong", soundName: ["oolong"]},
                      {name: "Pare de la Txitxi", imageName: "paretxitxi", soundName: ["paretxitxi"]},
                      {name: "Pilaf", imageName: "pilaf", soundName: ["pilaf"]},
                      {name: "Rei Neptú", imageName: "neptu", soundName: ["neptu"]},
                      {name: "Satan", imageName: "satan", soundName: ["satan"]},
                      {name: "Tortuga", imageName: "tortuga", soundName: ["tortuga"]},
                      {name: "Yamcha", imageName: "yamtxa", soundName: ["yamtxa"]}
                    ],
        mainWrapper = page.getViewById("mainWrapper"),
        body = page.getViewById('body');

    if(!loaded) {
        searchBar(characters, mainWrapper, body);
        loadSounds(characters);
        loadCharacters(characters, mainWrapper);
        loaded = true;
    }
    page.bindingContext = vmModule.mainViewModel;
}

function loadSounds(characters) {
    characters.forEach(function(item){
        sounds[item.soundName[0]] = soundModule.create("~/sounds/" + item.soundName + ".mp3");
    });
}

function stopAllSounds() {
    for(var key in sounds) {
        sounds[key].stop();
    }
}

function loadCharacters(characters, mainWrapper){
    characters.forEach(function(item){
        var stackLayout = new layout.StackLayout(),
            charImage = new imageModule.Image(),
            charLabel = new labelModule.Label();
        stackLayout.id = item.imageName;
        charImage.imageSource = ImageSourceModule.fromResource(item.imageName);
        charImage.cssClass = "character-image";
        charImage.stretch = enumsModule.Stretch.aspectFill;
        charImage.on(gesturesModule.GestureTypes.tap, function() {
            stopAllSounds();
            if(true){ //TODO: If no sound alert to user.
                sounds[item.soundName[0]].play();
            }else{
                dialogModule.alert({
                    title: "Missatge d'alerta",
                    message: 'Puja el volum.',
                    okButtonText: "Entesos"
                }); //TODO: Translations
            }
        });
        charLabel.text = item.name;
        charLabel.cssClass = "character-text";
        stackLayout.addChild(charImage);
        stackLayout.addChild(charLabel);
        mainWrapper.addChild(stackLayout);
    });
}

function searchBar (characters, body) {
    var searchBar = new searchBarModule.SearchBar();
    searchBar.cssClass = 'search-bar';
    searchBar.id = 'search-bar';
    searchBar.on(searchBarModule.SearchBar.submitEvent, function (args) {
        for(var i = 0; i < characters.length; i++) {
            var name = characters[i].name.toLowerCase(),
                 element = page.getViewById(characters[i].imageName.toLowerCase());
            if(name.indexOf(args.object.text.toLowerCase()) > -1) {
                element.cssClass = "show";
            }else{
                element.cssClass = "hide";
            }
        }
    });
    searchBar.on(searchBarModule.SearchBar.clearEvent, function () {
        for(var i = 0; i < characters.length; i++){
            var element = page.getViewById(characters[i].imageName);
            element.cssClass = "show";
        }
    });
    //Clear focus //TODO: Clear focus not working.
    if (searchBar.ios) {
        searchBar.ios.endEditing(true);
    } else if (searchBar.android) {
        searchBar.android.clearFocus();
    }
    body.addChild(searchBar);
}
exports.pageLoaded = pageLoaded;
