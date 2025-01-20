import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/CardDetail.css"

const CardDetails = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();

  const cardsData = [
    {
      id: 1,
      title: 'Beach Wedding Theme',
      description: 'A beautiful beachside wedding with stunning views and ocean breeze',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVS46Xsgnc3E4Iogm8HK8FQhn6JYrCanopdA&s',
      location: 'Goa',
      decorDetails: {
        mandap: {
          description: 'Elegant beachside mandap with floral arrangements',
          image: 'https://gallery.theweddingcompany.com/cdn/shop/files/87c70a1b9a05be046e998325e696bba6_550x.jpg?v=1709882504'
        },
        entrance: {
          description: 'Shell and flower decorated entrance arch',
          image: 'https://gallery.theweddingcompany.com/cdn/shop/files/5_4a9ddcd4-8792-4699-8e23-4ece5ae2e97d_1100x.jpg?v=1707394832'
        },
        pathway: {
          description: 'Lantern-lit sandy pathway',
          image: 'https://gallery.theweddingcompany.com/cdn/shop/files/b74a9e60e030737d4b7ad248d365c674.jpg?v=1711972280&width=4096'
        },
        lighting: {
          description: 'Warm ambient lighting with fairy lights',
          image: 'https://gallery.theweddingcompany.com/cdn/shop/files/bd9add9b2b3419467cf2ddca79c31d65.jpg?v=1709033626&width=4096'
        },
        seating: {
          description: 'Comfortable beach-themed seating for 200 guests',
          image: 'https://img.weddingbazaar.com/shaadisaga_production/photos/pictures/005/030/657/new_medium/framed.memoirs.jpg?1665076124'
        },
        dining: {
          description: 'Beachfront dining arrangement',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4b1OMg5rnJ84__gE_kjnUmxMaGQjPfd_mGZY-eCH7MKtvhoCLM3oEJxr8JrtPoAPHM-g&usqp=CAU'
        }
      },
      venue: {
        name: 'Taj Cidade de Goa Horizon, Goa',
        type: 'Hotels',
        location: 'Goa',
        price: '2000000',
        image: 'https://images.trvl-media.com/lodging/47000000/46210000/46205200/46205118/6a0edcf5.jpg?impolicy=resizecrop&rw=1200&ra=fit',
        manager: 'Sachin Kumar',
        contactNo: '1234578901',
        email: 'sachin@demo.com'
      }
    },
    {
      id: 2,
      title: 'Royal Weeding Theme',
      description: 'An extravagant royal wedding with luxury decor.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxD_oUfaiSiYcwWipqr9D63m2fCM6R4v45Eg&s',
      location: 'Udaipur',
      decorDetails: {
        mandap: {
          description: 'Elegant Palace mandap with floral arrangements',
          image: 'https://gallery.theweddingcompany.com/cdn/shop/files/11_1c143dec-b542-4d96-84c9-14059cfb94c1_576x.jpg?v=1707395424'
        },
        entrance: {
          description: 'Rajasthani Royal: Divine Entrance',
          image: 'https://gallery.theweddingcompany.com/cdn/shop/products/Screenshot_2023-11-30_171118-fotor-20231201154240_1100x.jpg?v=1701933430'
        },
        pathway: {
          description: 'Rajasthani Royal: Regal Pathway',
          image: 'https://gallery.theweddingcompany.com/cdn/shop/products/afda57bb2757cfe34ac12014c2cfea08_1_-fotor-20231123152328_576x.jpg?v=1700822363'
        },
        lighting: {
          description: 'Warm ambient lighting with fairy lights',
          image: 'https://cdn0.weddingwire.in/article/8734/original/1280/jpg/114378-weddingnama-umaid-bhawan-palace.jpeg'
        },
        seating: {
          description: 'Comfortable beach-themed seating for 200+ guests',
          image: 'https://cdn0.weddingwire.in/article/9437/3_2/960/jpg/37349-wedding-decoration-ideas-dhanika-choksi-photography-lead.jpeg'
        },
        dining: {
          description: 'RoyalPalace dining arrangement',
          image: 'https://cdn0.weddingwire.in/vendor/2286/3_2/960/jpeg/banquet-halls-the-royal-palace-banquet-hall-9_15_412286-165577604394483.jpeg'
        }
      },
      venue: {
        name: 'City Palace,Udaipur,Rajasthan',
        type: 'Palace',
        location: 'Udaipur',
        price: '34000000',
        image: 'https://map.sahapedia.org/admin/assets/images/2021033013400727799_Banner.jpg?__imr__=bannerMuseum',
        manager: 'Samarth Kumar',
        contactNo: '1234578901',
        email: 'sachin@demo.com'
      }
    },{
      id: 3,
      title: 'Garden Wedding Theme',
      description: 'A beautiful Garden wedding with stunning Grennery and  magnificient iews',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmC2qBQVlAq_nhzrVHWklPYTBdSr3i2e8b-w&s',
      location: 'Jaipur',
      decorDetails: {
        mandap: {
          description: 'Elegant Garden mandap with floral arrangements',
          image: 'https://www.happywedding.app/blog/wp-content/uploads/2020/04/Marvelous-Garden-Wedding-Ideas.jpg'
        },
        entrance: {
          description: 'Shell and flower decorated entrance arch',
          image: 'https://i.pinimg.com/736x/8c/c3/d1/8cc3d1c4322c9825b3fbcd761a47955e.jpg'
        },
        pathway: {
          description: 'Lantern-lit sandy pathway',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV3a0JHkNT3MPryOTDEj1FTf6sksBaGKFnvw&s'
        },
        lighting: {
          description: 'Warm ambient lighting with fairy lights',
          image: 'https://wp-media-partyslate.imgix.net/2022/03/photo-5e10ba54-5c3e-467a-b2c6-941226e2deb5.jpeg?auto=compress%2Cformat&fit=scale&h=840&ixlib=php-3.3.1&w=1260&wpsize=huge'
        },
        seating: {
          description: 'Comfortable beach-themed seating for 200 guests',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3o2yKjPgN5af3j6mBw0Z8h-9-3fBgjQNXgg&s'
        },
        dining: {
          description: 'Beachfront dining arrangement',
          image: 'https://wedmeplz.com/wp-content/uploads/2021/07/Intimate-Garden-Wedding-The-Mount-13-683x1024.jpeg'
        }
      },
      venue: {
        name: 'Safari Hotels',
        type: 'Hotels',
        location: 'Jaipur',
        price: '1200000',
        image: 'https://safirhotels.com/storage/media/fT6bYoQatu1pUuJelDpf8yp3PbLDVwBCbPCxkCCl.webp',
        manager: 'Samarth Solanki',
        contactNo: '1234578901',
        email: 'sachin@demo.com'
      }
    },{
      id: 4,
      title: 'Destination Weeding theme',
      description: 'Choose your destination with us ',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1l1U6rT_oQCpZOPZxTzOGgfjr8jSYJMnxWQ&s',
      location: 'Paris',
      decorDetails: {
        mandap: {
          description: 'Elegant mandap with floral arrangements',
          image: 'https://images.squarespace-cdn.com/content/v1/6564afb4f0851760cfcdde58/068b4481-54ed-4afe-92d8-53d6e6e17e5f/Srinidhi-Rishi-Taj+Fishermans+Cove-0830.jpg'
        },
        entrance: {
          description: 'Shell and flower decorated entrance arch',
          image: 'https://i.pinimg.com/736x/bc/25/bb/bc25bb26ce8c83f55ebfebd9745918a8.jpg'
        },
        pathway: {
          description: 'Lantern-lit sandy pathway',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV3a0JHkNT3MPryOTDEj1FTf6sksBaGKFnvw&s'
        },
        lighting: {
          description: 'Warm ambient lighting with fairy lights',
          image: 'https://media.weddingz.in/images/43da56e8c26f56f1b515c108abaef05c/grand-destination-wedding-held-at-grand-hyatt-goa-with-exquisite-decor-details-the-wedding-5.jpg'
        },
        seating: {
          description: 'Comfortable beach-themed seating for 200 guests',
          image: 'https://shaadiwish.com/blog/wp-content/uploads/2021/01/beach-wedding-decor.jpg'
        },
        dining: {
          description: 'Beachfront dining arrangement',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIWPfGYHkbTCrL8Q3_KwEsrj1z7Ej1jXGqpA&s'
        }
      },
      venue: {
        name: 'La-Vitte',
        type: 'Hotels',
        location: 'Paris',
        price: '2500000',
        image: 'https://static.toiimg.com/photo/53695760.cms',
        manager: 'Aryan Soni',
        contactNo: '1234578901',
        email: 'aryan@demo.com'
      }
    }
    // ... (other card data)
  ];

  const handleBooking = () => {
    navigate('/booking-form');
  };

  const card = cardsData.find((item) => item.id === parseInt(cardId));

  if (!card) {
    return <div className="error-message">Wedding theme not found!</div>;
  }

  return (
    <div className="wedding-details-container">
      {/* Main details section */}
      {/* Decoration details section */}
      <div className="decor-section">
        <h2 className="section-title1">Decoration Details</h2>
        <div className="decor-grid1">
          {Object.entries(card.decorDetails).map(([key, value]) => (
            <div key={key} className="decor-card">
              <div className="decor-image-container">
                <img src={value.image} alt={key} className="decor-image" />
              </div>
              <div className="decor-content">
                <h3>{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
                <p>{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Venue details section */}
      <div className="venue-section">
        <h2 className="section-title">Venue Details</h2>
        <div className="venue-content">
          <img src={card.venue.image} alt={card.venue.name} className="venue-image" />
          <div className="venue-info-grid">
            <div className="venue-detail">
              <span className="detail-label">Venue Name:</span>
              <span className="detail-value">{card.venue.name}</span>
            </div>
            <div className="venue-detail">
              <span className="detail-label">Location:</span>
              <span className="detail-value">{card.venue.location}</span>
            </div>
            <div className="venue-detail">
              <span className="detail-label">Manager:</span>
              <span className="detail-value">{card.venue.manager}</span>
            </div>
            <div className="venue-detail">
              <span className="detail-label">Contact:</span>
              <span className="detail-value">{card.venue.contactNo}</span>
            </div>
            <div className="venue-detail">
              <span className="detail-label">Email:</span>
              <span className="detail-value">{card.venue.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Booking section */}
      <div className="booking-section">
        <div className="price-summary">
          <h3>Total Package Price</h3>
          <p className="total-price">₹ {card.venue.price}</p>
          <p className="price-note">*Includes all decoration and venue charges</p>
        </div>
        <button className="book-plan-btn" onClick={handleBooking}>
          Book This Package
        </button>
      </div>
    </div>
  );
};

export default CardDetails;