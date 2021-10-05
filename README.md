# 🚚 🗺️ 🇺🇸 Fleet Electrification in Texas Story Map
This repository contains the source code for the [fleet electrification story map](http://carto.com/gmaps-demo).

[<img src="https://user-images.githubusercontent.com/127803/132099270-217beec8-8076-4377-9dc6-4187b480eaef.png">](http://carto.com/gmaps-demo)

Checkout also the overall technical blog post we published if you want to get more context.

## 🧱 Overall structure of the code

We are following a classical React App structure.

 * `assets`: images, icons, etc.
 * `components`: JSX components of the app
 * `layers`: where the actual juice is. With each slide/visualization on a separate file

## 🏃🏽‍♀️ How to run it

Checkout the code and...

Install all dependencies with:

```yarn install```

Specify your Google Maps API Key to use. You can get a Google Maps API Key on the GCP console. Remember to authorize localhost to it.

```export GoogleMapsAPIKey=xxxx```

```yarn start```

will start the server on localhost:8080

## 💬 issues/comments/whatever?

You can contact CARTO always at contact@carto.com, but we also hangout on the CARTO Users community Slack server:

https://cartousercommunity.slack.com/join/shared_invite/zt-t7t7k5s4-3c4pZJLrLlkVow3AEDt~ZQ#/shared-invite/email

  

