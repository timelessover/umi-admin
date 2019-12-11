import React from 'react'
import { Carousel } from 'antd'
import styles from'./index.scss'


const Home = () => {
    return (
      <div  className={styles['home']}>
        <Carousel autoplay={true} arrows={true} >
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
        </Carousel>
      </div>
    )
}
export default Home