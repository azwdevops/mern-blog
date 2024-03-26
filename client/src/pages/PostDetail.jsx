import PostAuthor from "@/components/PostAuthor";
import { Link } from "react-router-dom";
import Thumbnail from "@/images/blog22.jpg";

const PostDetail = ({ postId }) => {
  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail-header">
          <PostAuthor />
          <div className="post-detail-buttons">
            <Link to={`/posts/${postId}/edit`} className="btn sm primary">
              Edit
            </Link>
            <Link to={`/posts/${postId}/delete`} className="btn sm danger">
              Delete
            </Link>
          </div>
        </div>
        <h1>This is the post title</h1>
        <div className="post-detail-thumbnail">
          <img src={Thumbnail} alt="" />
        </div>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo
          voluptas animi sed quasi quas labore dolore, hic nobis, culpa, odio
          quaerat. Aut illum at deleniti quod ab rem. Optio molestias asperiores
          quidem maiores eos obcaecati iure dicta voluptatibus voluptatum dolor!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
          ratione quas esse iure deserunt architecto iste odit ipsam quae nobis
          pariatur dolores voluptas ipsum quasi corrupti, libero optio nisi
          expedita illo non blanditiis labore. Excepturi in soluta maiores nobis
          illo. Quas velit sed amet qui, dignissimos totam unde facere ducimus.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
          perferendis cum tempore id esse reprehenderit? Corporis dolores
          eveniet iusto laudantium deserunt consectetur molestiae a neque,
          voluptate sint nulla quas enim quae, atque rem. Eos, unde vel maxime
          error omnis eveniet! Aut libero dolores quod ad dolor quisquam quia
          illo ea fuga ab, et beatae distinctio soluta tempore. Quis quod dolore
          omnis repellendus possimus tenetur consequuntur enim nostrum
          accusantium cupiditate quae explicabo illum placeat, fuga distinctio
          totam sequi! Ipsa placeat cumque voluptatem amet explicabo rerum
          eligendi odit consequuntur? Molestias praesentium odio perferendis
          animi enim fugiat laudantium, beatae ipsa? Tempore, cupiditate
          deserunt.
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam
          facilis, in earum sit inventore at dolore non labore dolores
          consectetur.
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente eos
          assumenda ex quas quia consequuntur ipsam, alias neque maxime
          voluptatem adipisci qui aliquid asperiores nesciunt laudantium itaque
          laborum delectus, dolores beatae? Quam qui sunt, et ea quos quis
          molestias repellat porro assumenda tempora excepturi facere natus
          temporibus, blanditiis architecto dolorum labore eum eos. A fuga
          quibusdam ratione facilis vel atque!
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Exercitationem minima, magni repellendus explicabo enim commodi dolore
          quo tenetur eos inventore consequuntur expedita cum asperiores
          corporis natus praesentium voluptatum ab sequi provident ullam quaerat
          earum ducimus? Impedit amet ea labore non, adipisci maxime nobis
          explicabo neque totam commodi enim sint modi ad quibusdam consequuntur
          esse ducimus iure vel, ipsum ab unde ex quod nulla. Accusantium facere
          quidem, earum nesciunt quis rerum, consectetur voluptatibus, error
          praesentium ducimus similique distinctio beatae nemo ad facilis sit
          odio nisi minima tempore officia dolorem porro recusandae. Facilis,
          tenetur! Delectus voluptatum recusandae in eligendi ullam quidem
          ratione iusto praesentium, ex adipisci consequatur laborum excepturi
          exercitationem maxime et. Veritatis non illo fuga impedit nisi omnis
          obcaecati autem reiciendis quas quos! Maxime repellat accusamus odit
          expedita praesentium impedit perferendis asperiores fuga veritatis cum
          magni pariatur molestias vel eligendi delectus deserunt, totam, sed
          voluptatem nihil voluptates similique repudiandae animi. In deleniti
          nam nemo aspernatur asperiores, beatae minus reprehenderit
          voluptatibus quam laboriosam iure facilis eveniet voluptate totam
          provident nostrum labore reiciendis animi deserunt alias cumque.
          Placeat ipsam quod quo voluptatem accusantium dolores soluta, quas
          dignissimos doloremque? Esse perferendis impedit eos reiciendis beatae
          modi vero numquam, sit consequatur quaerat rem, cupiditate in?
        </p>
      </div>
    </section>
  );
};

export default PostDetail;
