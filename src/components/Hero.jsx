import { logo } from "../assets";
const Hero = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3 nav">
        <img src={logo} alt="logo" className="w-28 object-contain"></img>
        <button
          type="button"
          onClick={() => {
            window.open("githublink");
          }}
          className="black_btn"
        >
          Github
        </button>
      </nav>
      <h1 className="head_text">
        Summarize Topics with <br className="max-md:hidden"></br>
        <span className="orange_gradient">OpenAI GPT-4</span>
      </h1>
      <h2 className="desc">
        Summarize any Topics with Summize, an open-source article summarizer
        that summarize lengthy topics into small and concise summaries
      </h2>
    </header>
  );
};

export default Hero;
