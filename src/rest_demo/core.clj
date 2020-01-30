(ns rest-demo.core
      (:gen-class))
(require '[etaoin.api :as etaoin])

(defn pepe [imageName, driver]
      (etaoin/screenshot driver, imageName)
      )

(defn -main
      [& args]
      (def driver (etaoin/chrome {:headless true}))
      (etaoin/go driver "https://www.atib.es/TA/modelos/Modelo.aspx?m=621&lang=es")
      (pepe driver, "pepe.png")
      )


