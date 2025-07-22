// components/SocialIcons.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubAlt, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
 
export default function Social() {
  return (
    <div className="flex justify-center gap-6 mt-10 text-gray-500  text-3xl">
      <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600">
        <FontAwesomeIcon icon={faGithubAlt} />
      </a>
      <a href="https://www.linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600">
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
      <a href="https://www.instagram.com/yourusername" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600">
        <FontAwesomeIcon icon={faInstagram} />
      </a>
    </div>
  );
}