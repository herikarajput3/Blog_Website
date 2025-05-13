import { Link } from "react-router-dom";

const Navbar = () => {

  const scrollRight = () => {
    const scrollRight = document.querySelector(".scroll");
    if (scrollRight) {
      scrollRight.scrollBy({
        left: 200,
        behavior: "smooth",
      })
    }
  };

  return (

      <div className="py-2 border-bottom sticky-top mb-4 bg-white" >
        <div className="container d-flex align-items-center">
          <div className="me-3">
            <Link><i className="fas fa-plus fs-6 text-secondary"></i></Link>
          </div>

          <div
            className="flex-grow-1 d-flex overflow-auto scroll"
            style={{
              whiteSpace: "nowrap",
              scrollbarWidth: "none",
            }}
          >
            {[
              { name: "For you" },
              { name: "Following" },
              { name: "Featured", isNew: true },
              { name: "Financial Education" },
              { name: "Hacking" },
              { name: "Technology" },
              { name: "Progamming" },
              { name: "Crypto" },
            ].map((topic, index) => (
              <div
                key={index}
                className="d-flex align-items-center px-3"
                style={{ fontSize: "16px" }}
              >
                <Link
                  to={`/${topic.name}`}
                  className="text-decoration-none text-secondary"
                  style={{ fontSize: "14px" }}
                >
                  {topic.name}
                </Link>
                {topic.isNew && (
                  <span
                    className="ms-2 bg-success text-white px-2 py-1 rounded-3"
                    style={{
                      fontSize: "12px",
                    }}
                  >
                    New
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="ms-3">
            <i
              className="fas fa-chevron-right fs-6 text-secondary"
              onClick={scrollRight}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
        </div>
      </div>
  );
};

export default Navbar;



