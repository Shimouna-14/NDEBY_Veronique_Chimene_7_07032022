import { createGlobalStyle } from 'styled-components'

const Body = createGlobalStyle`
    body {
        font-family: 'EB Garamond', serif;
        margin: 0;
        padding: 0;
        height: 100%;
        font-size: 17px;
    }
    input, button{
        font-size: 14px;
    }
`

export default Body