import styled from 'styled-components';

export const Box = styled.div`
padding: 80px 6px;
background: black;
position: fixed;
bottom: 0;
width: 100%;


@media (max-width: 1000px) {
	padding: 10px 10px;
}
`;

export const Container = styled.div`
	display: flex;
	background: #112f61;
	flex-direction: column;
	justify-content: center;
	margin: 0 auto;
    width: 100%;
	/* background: red; */
`

export const Column = styled.div`
display: flex;
flex-direction: column;
text-align: left;
margin-left: 80px;
`;

export const Row = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
grid-gap: 97px;

@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
}
`;

export const FooterLink = styled.a`
color:black;
margin-bottom: 10px;
font-size: 16px;
text-decoration: none;

&:hover {
	color: white;
	transition: 200ms ease-in;
}
`;

export const Heading = styled.p`
font-size: 24px;
color:#16ADFF;
margin-bottom: 20px;
font-weight: bold;
`;
