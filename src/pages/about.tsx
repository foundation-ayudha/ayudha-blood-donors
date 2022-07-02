import { Meta } from "@/layouts/Meta";
import { Main } from "@/templates/Main";
import { SocialIcon } from 'react-social-icons';

const About = () => (
  <Main
    meta={
      <Meta
        title="About - Ayudha Foundation"
        description="A short description about Ayudha Foundation"
      />
    }
  >
    <p>
      We are a non-profit organization based out in <a target="_blank" href="https://www.google.com/maps/place/Adilabad(U),+Telangana+504001/">Adilabad 📌</a> that aims to provide a platform for blood
      donors to register themselves. People with enough previliges and access
      can have a look at the list of donors we already have and also few of them
      has rights to edit/delete them.
    </p>
    <p>
      We are a registered non-profit organization in the state of Telangana. You can find our details below. We are happy to hear suggestions from you if you have any.
    </p>
    <p>Our registration number is: </p>
    <div className="flex flex-row">
      <ul className="mr-4">
        <SocialIcon url="https://www.facebook.com/ayudha.foundation/" />
      </ul>
      <ul className="mr-4">
        <SocialIcon url="https://www.instagram.com/ayudha.foundation/" />
      </ul>
      <ul className="mr-4">
        <SocialIcon url="https://twitter.com/ayudha_foundation" />
      </ul>
      <ul className="mr-4">
        <SocialIcon url="mailto:foundation.ayudha@gmail.com" />
      </ul>
    </div>
  </Main>
);

export default About;
