import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./LandingStyles.css";
import holdingPhone from "./Img/holding-phone.jpg";
import illustration from "./Img/illustration.svg";


function LandingPage({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push("/mynotes");
    }
  }, [history, userInfo]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
          
              <h1 className="title">Welcome to Billo</h1>
              <section className="hero">
                <div class="container">
                  <div class="left-col">
                    <div class="hero-cta">
                      <a href="#" class="primery-cta">
                        Try for free
                      </a>
                    </div>
                  </div>
                  <img src={illustration} alt="Illustration" class="hero-img" />
                </div>
              </section>
        
              
        

          </div>
          
        </Row>
       
      </Container>
      
    </div>
  );
}

export default LandingPage;
