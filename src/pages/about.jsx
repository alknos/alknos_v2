import NavBar from './navbar'
import Footer from './landing_Components/footer'

const posts = [
  {
    title: '¿Quienes somos?',
    href: '#',
    category: { name: 'Article', href: '#' },
    description:
      'Una empresa de software mexicana, enfocada en buscar y garantizar tu comodidad dandote las herramientas para facilitar tu vida.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    imageUrl:
      'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '6 min',
    author: {
      name: 'Roel Aufderehar',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: '¿Cómo nos vemos a futuro?',
    href: '#',
    category: { name: 'Video', href: '#' },
    description:
      'Convertirnos en la mejor empresa desarrolladora de software que brinde soluciones rápidas abarcando cada necesidad del usuario, siendo estas accesibles, y consiguiendo el propósito de manera satisfactoria.',
    date: 'Mar 10, 2020',
    datetime: '2020-03-10',
    imageUrl:
      'https://images.unsplash.com/photo-1547586696-ea22b4d4235d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '4 min',
    author: {
      name: 'Brenna Goyette',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    title: 'Nuestra razón de',
    href: '#',
    category: { name: 'Case Study', href: '#' },
    description:
      'Crear y ofrecer software de la más alta calidad, donde se priorice la experiencia del usuario, siendo esta intuitiva y fácil de usar, cubriendo necesidades de manera responsable usando tecnología de vanguardia y responsiva.',
    date: 'Feb 12, 2020',
    datetime: '2020-02-12',
    imageUrl:
      'https://images.unsplash.com/photo-1492724441997-5dc865305da7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80',
    readingTime: '11 min',
    author: {
      name: 'Daniela Metz',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]

export default function Example() {
  return (
    <>
      <NavBar />
      <div className="bg-white w-full">

        <br />
        <br />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-light text-gray-900 sm:text-4xl">Acerca de Nosotros</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl font-extralight text-gray-500 sm:mt-4">
              Queremos que nos conozcas un poco. Queremos que sepas cual es la razón de esta empresa, como nos vemos a futuro y
              los valores que nos representan.
            </p>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
            {posts.map((post) => (
              <div key={post.title} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div className="flex-shrink-0">

                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                  <div className="flex-1">
                    <a href={post.href} className="block mt-2">
                      <p className="text-xl font-light text-gray-900">{post.title}</p>
                      <p className="mt-3 text-base font-light text-gray-500">{post.description}</p>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <Footer />
      </div>
    </>
  )
}
