import Feed from '@components/Feed'


const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
        <h1 className="head_text text-center">
            Objevujte a sdílejte 
            <br className="max-md:hidden"/>
            <span className="orange_gradient text-center"> AI-Powered Prompty</span>
        </h1>
    <p className="desc text-center">
        Promptuj - místo kde sdílíte svou kreativitu, produktivitu a inspiraci.
    </p>

    <Feed />
    </section>
  )
}

export default Home
