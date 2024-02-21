const index ='index.html'

describe('Bootstrap', () => {
 beforeEach(()=>{
  cy.visit(index)
 })


 it('Bootstrap successfully imported', () => {
  // Flag to check if Bootstrap CSS is found
  let isBootstrapFound = false;
  // Check each <link> element
  cy.get('link[rel="stylesheet"]').each(($el) => {
      const hrefValue = $el.attr('href');
      if (hrefValue.match(/bootstrap.*\.css/)) {
          isBootstrapFound = true;
      }
  }).then(() => {
      // Assert that Bootstrap CSS is found
      expect(isBootstrapFound).to.be.true;
  });
})



})



describe('Navbar', () => {
  beforeEach(()=>{
   cy.visit(index)
  })
 
 
 it('Navbar contains correct links and branding', () => {
   cy.get('.navbar').contains(/Destination Paradise/i);
   cy.get('.nav-link').contains(/Home/i).should('be.visible');
   cy.get('.nav-link').contains(/Destinations/i).should('be.visible');
   cy.get('.nav-link').contains(/About/i).should('be.visible');
 });


 it('Destination nav-link is a dropdown that contains the destinations provided in array', () => {
 cy.get('.nav-link').contains(/Destinations/i).should('be.visible').realHover();
 cy.contains(/Beach Getaway/i).should('be.visible');
 cy.contains(/Mountain Adventure/i).should('be.visible');
 cy.contains(/City Life Experience/i).should('be.visible');
 cy.contains(/more/i).should('be.visible');
 
  
});


it('Navbar should a search input with type as search', () => {
  cy.get('.navbar').get('input[type="search"]').should('be.visible');
   
 });


 it('Navbar should a search input with type as search', () => {
  cy.get('.navbar').get('input[type="search"]').should('be.visible');
   
 });


 it('Scrolls to the About section when clicking the About link in the Navbar', () => {
  // Assuming there's a link in the navbar that scrolls to the About section
  cy.get('.nav-link').contains('About').click();

  // Use the ID of the About section to scroll into view
  cy.get('#about').scrollIntoView();

  // Check if the About section is now visible on the screen
  cy.get('#about').should('be.visible');

  // For an additional check, ensure the About section contains expected content
  cy.get('#about').should('contain.text', 'About Us');
});
 
 
 })


 describe('Carousel', () => {
  beforeEach(()=>{
   cy.visit(index)
  })
 
 
  it('Carousel should be working and have 5 slides or images, the next button should slide to next image and contain the class next-slide , the previous button should contain the class previous-slide. Each side should have class carousel-item and the active slide should have a class as active (Use bootstrap carousel for easing the process and manually add the class)', () => {
    cy.get('.carousel-item').should('have.length', 5);
    cy.get('.active').find('img').should('be.visible');
    // Check if the Next button navigates to the next slide
    cy.get('.next-slide').click();
    cy.get('.carousel-item').eq(1).should('have.class', 'active');
    // Check if the Previous button navigates to the previous slide
    cy.get('.previous-slide').click();
    cy.get('.carousel-item').eq(0).should('have.class', 'active');
 
 })

 it('Carousel slides should slide to next slide every 3 seconds', () => {

  cy.get('.carousel-item').eq(0).should('have.class', 'active');
  // Check if the Previous button navigates to the previous slide
  cy.wait(4000)
  cy.get('.carousel-item').eq(1).should('have.class', 'active');
})
 
 
 
 })


 describe('Form', () => {
  beforeEach(()=>{
   cy.visit(index)
  })
 
  it('The booking form should have an input with type as text and id as name and have required attribute inside the form with id bookingForm', () => {
    cy.get('#bookingForm').within(() => {
      cy.get('input[type="text"][id="name"]').should('be.visible').and('have.attr', 'required');
    });
  });

  it('The booking form should have an input with type as email and id as email and have required attribute inside the form with id bookingForm', () => {
    cy.get('#bookingForm').within(() => {
      cy.get('input[type="email"][id="email"]').should('be.visible').and('have.attr', 'required');
    });
  });


  it('The booking form a select with id as countryCode and class as form-select inside the form with id bookingForm', () => {
    cy.get('#bookingForm').within(() => {
      cy.get('select[class="form-select"][id="countryCode"]').should('be.visible')
    });
  });

  it('The booking form should have an input with type as number and id as phone and have required attribute inside the form with id bookingForm', () => {
    cy.get('#bookingForm').within(() => {
      cy.get('input[type="number"][id="phone"]').should('be.visible').and('have.attr', 'required');
    });
  });

  it('The booking form should have an input with type as date and id as birthday and have required attribute inside the form with id bookingForm', () => {
    cy.get('#bookingForm').within(() => {
      cy.get('input[type="date"][id="birthday"]').should('be.visible').and('have.attr', 'required');
    });
  });
  

  it('The booking form a select with id as maritalStatus and class as form-select inside the form with id bookingForm', () => {
    cy.get('#bookingForm').within(() => {
      cy.get('select[class="form-select"][id="maritalStatus"]').should('be.visible')
    });
  });


  it('Throws message "Please enter a valid 10-digit phone number." if number is less than 10 digit when the form is submitted', () => {

    
    cy.get('#bookingForm').within(() => {
      cy.get('input[type="text"][id="name"]').type('John Doe');
      cy.get('input[type="email"][id="email"]').type('john@gmail.com');
      cy.get('select[class="form-select"][id="countryCode"]').select(4);
      cy.get('input[type="number"][id="phone"]').type('9010732')
      cy.get('input[type="date"][id="birthday"]').type('2002-01-01');
      cy.get('select[class="form-select"][id="maritalStatus"]').select(1);
      cy.contains(/submit/i).click();
      cy.contains(/Please enter a valid 10-digit phone number./i).should('exist');
    });
   
  });



  it('Throws message "You must be at least 18 years old." if the age is less than 18 when the form is submitted', () => {

    
    cy.get('#bookingForm').within(() => {
      cy.get('input[type="text"][id="name"]').type('John Doe');
      cy.get('input[type="email"][id="email"]').type('john@gmail.com');
      cy.get('select[class="form-select"][id="countryCode"]').select(4);
      cy.get('input[type="number"][id="phone"]').type('9010732478')
      cy.get('input[type="date"][id="birthday"]').type('2019-01-01');
        cy.contains(/submit/i).click();
      cy.contains(/You must be at least 18 years old./i);
    });

    

  });


  it('Throws message "You must be at least 18 years old." if the age is less than 18 when the form is submitted', () => {

    
    cy.get('#bookingForm').within(() => {
      cy.get('input[type="text"][id="name"]').type('John Doe');
      cy.get('input[type="email"][id="email"]').type('john@gmail.com');
      cy.get('select[class="form-select"][id="countryCode"]').select(4);
      cy.get('input[type="number"][id="phone"]').type('9010732478')
      cy.get('input[type="date"][id="birthday"]').type('2001-01-01');
        cy.contains(/submit/i).click();
      cy.contains(/ Thanks for your interest, our tour experts will get back to you shorty!/i);
    });


    

  });
 
 
 
 })


 describe('Destination packages', () => {
  beforeEach(()=>{
   cy.visit(index)
  })

  it('Inside each package with class "package" should have an image of the container with  class as image-container', () => {
  
    cy.get('.package').first().within(() => {
      cy.get('.image-container').then($image => {
        // Check if the video tag itself has the src attribute set to the desired URL
        const imageSrc = $image.attr('src');
        if (imageSrc === 'https://cdn.pixabay.com/photo/2016/11/23/13/48/beach-1852945_640.jpg') {
          expect(imageSrc).to.equal('https://cdn.pixabay.com/photo/2016/11/23/13/48/beach-1852945_640.jpg');
        } else {
          // If not, look for a source tag within the video tag that has the desired URL
          cy.wrap($image)
            .find('img')
            .then($img => {
              // Assuming there might be multiple source tags, verify at least one matches
              const imagetag = $img.toArray().map(el => el.getAttribute('src'));
              expect(imagetag).to.include('https://cdn.pixabay.com/photo/2016/11/23/13/48/beach-1852945_640.jpg');
            });
        }
      });
    });
   
  });



  it('Inside each package with class "package" should have package name with class as package-name', () => {
  
    cy.get('.package').first().within(()=>{
      cy.get('.package-name').contains(/Beach Getaway/i)
    })
   
  });

  it('Inside each package with class "package" should have package description with class as package-description', () => {
  
    cy.get('.package').first().within(()=>{
      cy.get('.package-description').contains(/Enjoy a relaxing time at the sunny beaches of Bali. Inclusive of hotel stay and guided tours./i)
    })
   
  });

  it('Inside each package with class "package" should have package submit button with class as book-now-btn and with text "Book Now"', () => {
  
    cy.get('.package').first().within(()=>{
cy.get('.book-now-btn').contains(/Book Now/i)
    })
    
  });


})

describe('About section', () => {
  beforeEach(()=>{
   cy.visit(index)
  })

  it('The about section with class as about-container should have two parts, an image with class about-img on the left side, and the content on the right side with class about-text', () => {
  
    cy.get('.about-container').within(()=>{
cy.get('.about-img').should("exist")
cy.get('.about-text').should("exist")
    })
    
  });
  

})


describe('Search bar', () => {
  beforeEach(()=>{
   cy.visit(index)
  })

  it('Search Input should have id as searchInput an should be filtering the packages with class package which is coming from the given array, the filtering should work without any button look up the UI reference video.', () => {
  
    cy.get('.package').first().within(()=>{
      cy.get('.package-name').contains(/Beach Getaway/i)
    })
cy.get('#searchInput').should("exist")
cy.get('#searchInput').type("Mountain Adventure")
cy.get('.package').first().within(()=>{
  cy.contains(/Mountain Adventure/i)
})
    
  });
  

})


describe('Responsive Design', () => {
  beforeEach(()=>{
   cy.visit(index)
  })

  it('Should render one package in a row for width below 768px', () => {
    cy.viewport(768, 1024) // Set viewport width to just below 768px to test for mobile view
    cy.get('.package').each(($el, index, $list) => {
      if (index > 0) { // Skip the first element because it has nothing to compare above it
        const prevItemRect = $list[index - 1].getBoundingClientRect();
        const currentItemRect = $el[0].getBoundingClientRect();
        expect(currentItemRect.top).to.be.greaterThan(prevItemRect.top); // Ensure current item is below the previous item
      }
    });
  });
  


  it('Should render three package in a row for for width above 768px', () => {
    cy.viewport(1280, 768)
    cy.get('.package').then(($items) => {
      expect($items).to.have.length.gte(3); // Ensure there are at least two items
      const firstItemRect = $items[0].getBoundingClientRect();
      const secondItemRect = $items[1].getBoundingClientRect();
      const thirdItemRect = $items[2].getBoundingClientRect();
      expect(firstItemRect.top).to.eq(secondItemRect.top).to.eq(thirdItemRect.top) ;// Ensure the two items are on the same row
    });
  });

})