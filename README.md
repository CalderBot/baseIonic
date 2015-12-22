/* APP ARCHITECTURE AND DESIGN */

Left options
1. Choose photos
2. Choose and playlists
3. exit

main Screen
1. Sleep from/until
2. Tapping a time box brings up an analogue timepicker, and below the timepicker is a checkbox for music on wakeup, and slider for how long.





/* PROJECT USAGE NOTES */

1. Build the app from scratch: ionic start WhatIsMorning && ionic lib update && npm install && bower install &&
     ionic setup sass && ionic add ionic-service-core && ionic add ionic-service-deploy && ionic add ionic-service-analytics
2. After cloning: ionic lib update && npm install && bower install && ionic state restore
3. Run in browser: ionic serve
4. Run with simulators: ionic serve --lab
5. Run in emulator: ionic emulate ios --target-"iPhone 6s" --livereload --consolelogs
6. Run on device: ionic run ios --device --livereload --consolelogs
     Note 1: The initial build is slow enough to make you think it's broken, but it (probably) isn't.
           But if this stops working all together, do 'ionic build ios' then run in xcode.  There will likely be useful error messages there.
     Note 2: After first build phone doesn't need to be connected.
     Note 3; keep ionic serve going simultaneously for the gulp watchers to run
7. Running in XCode: ionic build ios, then open the .xcodeproj in xcode.  If livereload was running you need to stop that and ionic build ios
7. Missing or outdated plugins? check package.json against plugins directory.
8. Refresh all plugins (warning: empties platforms folder): ionic state restore
9. Make icons and splashscreen: add your own icon.png (min 512x512, no rounded corners) and splash.png (min 2208x2208) then 'ionic resources' does the rest
10. Deploy update: ionic upload --note "your commit message here" then go to ionic.io to *carefully* set versions and deploy to prod
11. Bower install:   bower install <BLAH> && gulp bower
12. Nuclear option for builds failing: delete platforms and plugins directories, then 'ionic platform add ios && ionic state restore', then fix app transport, then 'ionic build ios'

(A) *** SVG ***
For faster performance, put svg files in app/icons*.svg.  Gulp will convert them to fonts.

(B) *** IONIC DEPLOY USAGE ***
- ionic upload --note "your commit message here" --deploy=yourChannel // yourChannel could be for example 'dev'.  This makes a new version of the app in the dashboard, where it can be deployed to prod by clicking deploy
- ionic upload --note "your commit message here" --deploy=production // immediate prod deployment
- ABOUT VERSIONING : with deploy we can modify js/html/css.  Other mods like plugin additions can't be done this way.
  so we have to be very careful about versioning, and any change to binary should result in an addition of at least 0.1 to version number
  then we set min/max version numbers on our deployment so that any js/html/css updates that rely on, for instance, new plugins, will
  not be sent until user gets a full update from the apple/play store
- see http://docs.ionic.io/v1.0/docs/deploy-binary-versioning for more info

(C) *** IONIC BUG FIX - can't scroll vertically within horizontal ion-scroll ****
In ionic.js comment out an e.defaultPrevented as shown below.   That fixes the issue in which you can't scroll vertically
when positioned at a horizontal ion-scroll.  See https://github.com/driftyco/ionic/issues/2501
 ignoreScrollStart: function(e) {
    return //(e.defaultPrevented) ||  // defaultPrevented has been assigned by another component handling the event
           (/^(file|range)$/i).test(e.target.type) ||

(D) *** Fix for XCode ****
select TrainHeroic project -> Build Settings (Select all settings)
Under build options "Enable bitcode" should be "NO"

(E) *** GULP-SASS ISSUES ***
If you are running NodeV4
 - npm uninstall --save-dev gulp-sass
 - npm install --save-dev gulp-sass@2

(F) *** LANDSCAPE-PORTRAIT MUTANT ISSUE ***
Reverse the order of 2 lines of code in the AppDelegate.m didFinishLaunchingWithOptions method so that they look like this:
    [self.window makeKeyAndVisible];
    self.window.rootViewController = self.viewController;
This change will persist when you run 'ionic build ios' but of course not when you run 'ionic state restore'

(G) *** AFTER 'ionic-state-restore' ALWAYS: ***
Redo steps (D), and (F)

(H) *** wkwebview xcode build error ***
invalid argument exception... double check your envs.  local env will cause this error


(K) *** App store upload ***
 1. Make sure WhatIsMorning->target->general->deployment info->'requires_fullscreen' is checked
 2. Make sure WhatIsMorning->target->build settings->code signing->release is set to 'ios distribution'
 3. Make sure you have added in Build Settings -> Header Search Paths: "$(OBJROOT)/UninstalledProducts/$(PLATFORM_NAME)/include"
 3. Set the build to 'generic iOS device', then product->archive.