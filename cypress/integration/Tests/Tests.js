const { url } = require("inspector")
require('cypress-xpath')


const SetPolygon = () => {
        cy.get('[title="Draw Polygons"]').click()
        cy.get('#map')
        .click(120 , 390)
        .click(150 , 300)
        .click(200 , 375)
        .click(170 , 390)

        cy.get('.active > .leaflet-pm-actions-container > .action-finish').click()
        //cy.xpath('//*[@id="map"]/div[2]/div[1]/div[2]/div[4]/div/a[1]').click()
 }

 const SetPolyline = () => {
    cy.get('[title="Draw Polyline"]').click()
    cy.get('#map')
    .click(150 , 290)
    .click(200 , 300)
    cy.get('div').contains('Finish').click()
 }

 const SetCircle = () => {
    cy.get('[title="Draw Circle"]').click()
    .wait(500)
    cy.get('#map')
    .click(170 , 290)
    .click(200 , 300)
 }

context('Set a polygon, polyline and circle on map', () => {
    beforeEach(() => {
      cy.visit('https://geoman.io/geojson-editor')
    })

    // it('Create polyline', () => {
    //     SetPolyline()
    // })

    // it('Create polygon', () => {
    //     SetPolygon()
    // })

    // it('Create circle', () => {
    //     SetCircle()
    // })
})

context('Drag/Edit the Shapes', () => {
    beforeEach(() => {
        cy.visit('https://geoman.io/geojson-editor')
    })

    it('Drag the polygon', () => {
        SetPolygon()             

        cy.get('[title="Drag Layers"]').click()
        cy.wait(500)
        cy.get('#map')
        .trigger('mousedown',{ which: 1, x: 150, y: 360, force: true })
        .trigger('mousemove', { pageX: 700, pageY: 700 })
        .trigger('mouseup')

        cy.get('.active > .leaflet-pm-actions-container > .leaflet-pm-action').click()

    })

    it('Edit polyline', () => {
        SetPolyline()
        cy.get('[title="Edit Layers"]').click()
        cy.get('#map')
        .trigger('mousedown',{  x: 150, y: 290, force: true })
        .trigger('mousemove', { which: 1, pageX: 600, pageY: 600 })
        .trigger('mouseup')

        cy.get('.active > .leaflet-pm-actions-container > .leaflet-pm-action').click()

    })

    it('Cut polygon to 3', () => {
        SetPolygon()
        cy.get('[title="Cut Layers"]').click()
        cy.get('#map')
        .click(120,390)
        .click(200 , 350)
        .click(170 , 390)
        cy.get('.active > .leaflet-pm-actions-container > .action-finish').click()

        cy.get('[title="Cut Layers"]').click()
        cy.get('#map')
        .click(130,380)
        .click(120 , 340)
        .click(160 , 340)
        cy.get('.active > .leaflet-pm-actions-container > .action-finish').click()

    })

    it('Delete circle', () => {
        SetCircle()
        cy.get('[title="Remove Layers"]').click()
        cy.get('#map')
        .click(180,300)
        cy.get('.active > .leaflet-pm-actions-container > .leaflet-pm-action').click()

    })

    it('Max zoom out', () => {
        const checkDisable = () => {
            cy.get('[title="Zoom out"]')
            .then(($btn) => {
                const cls = $btn.attr('class')
    
                    if (cls.includes('disabled')) {
                      return
                    }
              
                    
                    cy.get('[title="Zoom out"]').click()
                    cy.wait(500, { log: false })
                    checkDisable()
                  })
              }
              checkDisable()

             })

    it('Max zoom in', () => {
        const checkDisable = () => {
            cy.get('[title="Zoom in"]')
            .then(($btn) => {
                const cls = $btn.attr('class')

                if (cls.includes('disabled')) {
                  return
                }
          
                
                cy.get('[title="Zoom in"]').click()
                cy.wait(500, { log: false })
                checkDisable()
              })
          }
          checkDisable()
    })
})
