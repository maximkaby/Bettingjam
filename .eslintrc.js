module.exports = {
    "extends": "airbnb",
    "env": {
        "browser": true,
        "es6": true
      },
    "plugins":[
      "class-property"
    ],
    "parser":"babel-eslint",
    "rules":{
        "linebreak-style": 0,
        "react/prefer-stateless-function":0,
        "react/jsx-filename-extension": [1, { "extension": [".js",".jsx"]}],
        "react/self-closing-comp": ["error", {
          "component":true,
          "html":false
        },
      ],
        "import/extensions": 0,
        "react/prop-types":0,
        "import/no-unresolved":0,
        "react/jsx-filename-extension":0,
        "comma-dangle": 0,
        "func-names":0,
        "arrow-body-style": 0,
        "react/forbid-prop-types": 0
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "ecmaFeatures": {
          "jsx": true
        }
      },
      "globals": {
        "document": true,
        "chrome": true
      }
};