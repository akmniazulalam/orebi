import React from 'react'
import Container from '../Container'
import Image from '../Image'
import cup from '/src/assets/cup.png'
import Flex from '../Flex'

const ProductDetails = () => {
  return (
    <Container>
        <Flex className={"flex-wrap gap-5"}>
            <Image src={cup}/>
        </Flex>
    </Container>
  )
}

export default ProductDetails