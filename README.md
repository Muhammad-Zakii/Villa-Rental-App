# villa-rental-app

Recent years, Villa party is very popular in some countries. But not everyone has a villa or not every villa house has entertainment facilities. In order to have a villa party, we need to rent a villa which has some entertainment facilities.
Our purpose is to design a simple web application to show villa and let the customer to book it.

In this practice challenge, you're encouraged to design and develop two screens for this villa rent application.

Display Villas screen
In this screen, display villas available for rent in list mode or tiles mode for users to browse.

Should allow input date to select villas for rent. Default, we show villas available for current date.
Should show villa thumbnail, location(city), price, capacity, facilities. Should be able to filter and sort by location, price, capacity.
Show only X villas when the screen loads, here X should be configurable value, such as 5, 10, 15, etc.
A LOAD MORE button, clicking on it will load next X villas.
Click on the row in list mode or the square in tiles mode, it will go to villa detail screen.
Add an BOOK button to the last column of the list or the bottom of each square in the tiles, clicking on it will book the villa with a confirmation modal.
Villa detail screen
In this detail screen, show 3 images in slider mode at the top of the screen, and show the villa name, location details, price, description (including more images, capacity, features and descriptions of entertainment facilities, etc.)
Provide a BOOK button to book the villa with a confirmation modal.
Provide a Back button to go back to previous screen.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
