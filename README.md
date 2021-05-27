## PDAC frontend

**Introduction**

This is the development repository of a hybrid SSR (server-side) and frontend HTML webapp that acts as the visible user interface of the PDAC, displayed on the 3.2" touchscreen.

Once built, the exported and minified webapp is located inside [pdac app folder](https://github.com/RegieKI/pdac/tree/stable/app)<sup>1</sup> and launched at startup into Chromium browser with flags such as [kiosk mode](https://github.com/RegieKI/pdac/blob/stable/system/launchBrowser.sh).

**Threads**

After launching the webapp creates thread running the Python backend<sup>2</sup> API as well as it's own</sup> API for triggering utility scripts in [pdac system folder](https://github.com/RegieKI/pdac/tree/stable/system)<sup>3</sup> like [rclone to cloud](https://github.com/RegieKI/pdac/blob/stable/system/rcloneSync.sh). 

**Terminology**

* *pdac-backend* - local API for triggering camera and miband data recordings
* *directus* - remote instance of [Directus](https://github.com/directus/directus) for defining training instructions
* *exercises* - directions for performers, ie. *perform X for N seconds*
* *sessions* - sequences of *exercises*

**Modes**

Sessions and exercises can have two modes: `RECORD` and `STAGE`

* in `RECORD` the timing and start / stop events are used to trigger recordings
* in `STAGE` mode the timing and start / stop events are sent externally to websockets port `8765` 
* a third `RECEIVER` mode is accessed from the menu, and will visually display any text and instructions received from port `8765`<sup>4</sup>

Modes and the location of the API must always be set as an environment variable ([see package.json](https://github.com/RegieKI/pdac-frontend/tree/stable/package.json)).

**Training**

In either mode Sessions and Exercises can be dynamically updated via a remote instance of [Directus]() - the backend interface allows the director to create, edit and update training exercises. A copy of the last version of the database used is available as JSON in [directus static backup](#)<sup>5</sup>.

For demonstations and open source, the default setting is to use static copy of the Director API rather than a live API<sup>6</sup>.

**Notes**

<sup>1</sup> install [app build](https://github.com/RegieKI/pdac/tree/stable/app) dependencies with `npm install --production` \
<sup>2</sup> see [pdac-backend](https://github.com/RegieKI/pdac-backend) \
<sup>3</sup> created with `spawn` in [server.js](https://github.com/RegieKI/pdac-frontend/tree/stable/src/server.js) \
<sup>4</sup> sockets are client-side only in [layout.svelte](https://github.com/RegieKI/pdac-frontend/tree/stable/src/routes/_layout.svelte) \
<sup>5</sup> for use with [Directus v8.8.1](https://github.com/directus/directus/releases/tag/v8.8.1) (>=9 not supported) \
<sup>6</sup> to switch from a static example to live API, edit [config.js](https://github.com/RegieKI/pdac-frontend/tree/stable/config.js)


* [pdac](https://github.com/RegieKI/pdac) contains essential information about USB formatting and rsync configuration
* [pdac-backend](https://github.com/RegieKI/pdac-backend) contains information about API endpoints
* [regieki-controller](https://github.com/RegieKI/regieki-controller) provides an application for remote debugging multiple PDACs

**Status**

Many of the API functions used here have gone on to become:

* [ezapi](https://github.com/autr/ezapi) - autoconfiguring API toolkit
* [ezlib](https://github.com/autr/ezlib) - utility endpoints for *ezapi*
* [piapi](https://github.com/autr/piapi) - Raspberry Pi remote user interface


#### Instructions


```
cd /home/pi
git clone pdac-frontend --recursive
cd pdac-frontend 
pnpm i
```

**Development**

```
pnpm run dev
```

**Build**

```
pnpm run build
```

*NB*: pdac-frontend should be located side-by-side in it's directory [see formatting notes](https://github.com/RegieKI/pdac)
