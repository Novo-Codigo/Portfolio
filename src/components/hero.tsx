import { Image } from 'next/image';

export default function Hero() {
  return (
    <div>
      <div>
        <p>Premium Engineering</p>
        <h1>Your idea. <br/>Perfectly built.</h1>
        <p>We transform complex ideas into exceptional digital experiences with high-end engineering and a focus on transparency.</p>
        <div>
          <button>Start your project</button>
          <a href='#proejcts'>View our work</a>
        </div>
        <hr/>
        <div>
          <p>Trusted by industry leaders</p>
          <ul>
            <li>Logo</li>
            <li>Logo</li>
            <li>Logo</li>
          </ul>
        </div>
      </div>
      <div>
        <Image href="https://cdn.pixabay.com/photo/2021/12/12/20/00/play-6865967_1280.jpg" className="w-full h-full" />
      </div>
    </div>
  );
}
