import { thumbUrl } from "../utils/UrlHelper";
import "./AboutComponent.scss";
import { siteImageUrl } from "../utils/UrlHelper";

function AboutComponent() {
  const endalaThumb = 15;
  return (
    <div className="container about">
      <h1>About Endala</h1>
      <img src={thumbUrl(endalaThumb)} alt={`Endala #${endalaThumb}`}></img>
      <p>
        Endala started is a passion project for me. I wouldn't normally consider
        myself an artist of any merit, but computer graphics sparked my
        imagination when I was a child and lead me on a path to eventually
        become a software professional. Lately, with the NFT craze, I have seen
        some amazing things being done, especially with generative art and I
        felt compelled to participate.
      </p>
      <p>
        I came across an{" "}
        <a href="https://www.artblocks.io/" alt="Art Blocks">
          Art Blocks
        </a>{" "}
        project called{" "}
        <a href="https://70spop.love/" alt="70s Pop">
          70s Pop
        </a>{" "}
        by an artist named Daniel Catt. This project really caught my attention
        and showed me how complex graphics can emerge from very simple rules. It
        reminded me of a project I had worked on in my earlier years with{" "}
        <a href="https://en.wikipedia.org/wiki/L-system">L-Systems</a>. These
        programs would take simple rules and recursively rewrite them and the
        result would be incredibly complex organic shapes.
      </p>
      <p>
        After seeing 70s pop and remembering some of my earlier work in graphics
        I felt inspired to try out a new project and came up with Endala.
        Endala's heart really lies in the 70s pop project, which essentially
        starts with simple tiles and by randomly rotating and placing them,
        flowing, eye-catching graphics emerge. Endala tries to take this concept
        to the next level.
      </p>
      <p>
        The novel innovations I came up with were to first use a hexagonal grid
        rather than a square one. This allowed for a richer variety of
        intersections in the tiling. Secondly, I came up with a system to
        dynamically draw the strokes in a large variety of ways, with a pallete
        system that would transform the underlying colors to generate lots of
        different types of lines. Lastly, the grid itself is dynamically
        generated based on unique constraints for each edges. This means that
        rather than having a fixed set of tiles that are placed and rotated,
        each tile is generated specifically for the spot where it will go. This
        unlocked the ability to frame the image with whitespace or allow
        whitespace in the middle of the grid.
      </p>
      {/* <h2>How it's done</h2>
      <img src={siteImageUrl("hexes.png")} alt="Hexagons"></img> */}
    </div>
  );
}

export default AboutComponent;
