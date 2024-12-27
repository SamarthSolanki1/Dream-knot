import React, { useState } from "react";
import "../styles/testimonial.css";

const testimonials = [
  {
    image: "https://i.pinimg.com/736x/49/63/17/496317d5d0ded3faa44a3b3f275aa13c.jpg",
    name: "Neena & Collins",
    location: "Bengaluru, Karnataka",
    review:
      "When we contacted WBB to help us plan our wedding reception, we didn't imagine that it would end up looking so perfect. Our reception turned out to be absolutely amazing!",
    stars: 5,
  },
  {
    image: "https://www.azafashions.com/blog/wp-content/uploads/2023/02/Sid-Kiara.jpg",
    name: "Rupal & Aman",
    location: "Bengaluru, Karnataka",
    review:
      "Our destination wedding couldn't have been more perfect! We would like to thank Mohit for his exceptional efforts to not only meet our expectations but to go above and beyond.",
    stars: 5,
  },
  {
    image: "https://shaadiwish.com/blog/wp-content/uploads/2022/02/varun-dhawan-intimate-wedding-2.jpg",
    name: "Surabhi & Saumyadeep",
    location: "Bengaluru, Karnataka",
    review:
      "We had an intercultural wedding & our planner included elements from both Bengali and South Indian culture.",
    stars: 5,
  },
  {
    image: "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2018/10/Celebrity-Wedding-Feature.jpg",
    name: "Ankita & Bharat",
    location: "Bengaluru, Karnataka",
    review:
      "Radhika, our wedding planner, made not only our wedding day but all the functions - big and small - worry-free.",
    stars: 5,
  },
  {
    image: "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2018/10/Celebrity-Wedding-Feature.jpg",
    name: "Vaishali & Rohit",
    location: "Bengaluru, Karnataka",
    review:
      "I always dreamed of a perfect wedding, and working with WBB made it all go smoothly. She's the best!",
    stars: 5,
  },
];

const TestimonialSection = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="testimonial-section">
      <h2>Our work speaks for us</h2>
      <p>
        People love the way we planned their weddings. We made it <i>perfect</i>.
      </p>
      <div 
        className="testimonial-marquee"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="testimonial-track"
          style={{ 
            animationPlayState: isHovered ? 'paused' : 'running',
            transform: 'translateX(0)' // Reset any inline transform
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <img src={testimonial.image} alt={testimonial.name} />
              <div className="testimonial-content">
                <h3>{testimonial.name}</h3>
                <p className="location">{testimonial.location}</p>
                <div className="stars">
                  {"★".repeat(testimonial.stars)}
                </div>
                <p className="review">{testimonial.review}</p>
              </div>
            </div>
          ))}
          {/* Clone testimonials to create an infinite loop effect */}
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={`clone-${index}`}>
              <img src={testimonial.image} alt={testimonial.name} />
              <div className="testimonial-content">
                <h3>{testimonial.name}</h3>
                <p className="location">{testimonial.location}</p>
                <div className="stars">
                  {"★".repeat(testimonial.stars)}
                </div>
                <p className="review">{testimonial.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;