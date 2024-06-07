import styled from "styled-components";
import SellerLayout from "../../components/layout/SellerLayout";
import { S_btn, S_btn_white } from "../../components/buttons";
import image from '../../assets/images/img.png'
import { useMutation, useQuery } from "@tanstack/react-query";
import { normalAxios } from "../../axios";
import { ComfirmModal } from "../../components/modal/comfirmModals";
import { ConfirmOpen } from "../../atom/Atom";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Table = styled.table`
  table-layout: fixed;
  width: 100%;
  min-width: 500px;
  border-collapse: collapse;
  background: #fff;
`

const FlexItem = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  `

const TrStyle = styled.tr`
  border: 1px solid ${({theme}) => theme.gray2};
  word-break:break-all;
  `

const ThStyle = styled.th`
  text-align: center;
  padding: 18px;
  width: ${(props) => props.$first ? '55%' : null};
  width: ${(props) => props.$second ? '25%' : null};
  width: ${(props) => props.$third ? '10%' : null};
  width: ${(props) => props.$fourth ? '10%' : null};
`
const TdStyle = styled.td`
  padding: 16px;
  word-break:break-all;
  vertical-align: middle;
  text-align: ${(props) => props.$first ? 'left' : 'center'};
  line-height: 1.3;
`

const ProductImg = styled.img`
  width: 70px;
  height: 70px;
  object-fit: cover;
`

const ProdcutNameP = styled.p`
  font-size: 18px;
`
const StockP = styled.p`
  font-size: 16px;
  color: ${({theme}) => theme.gray3};
`
const PriceSpan = styled.span`
  font-size: 18px;
  font-weight: 600;
`

const NoCont = styled.p`
  font-weight: 500;
  text-align: center;
  margin: 220px 0;
`


export default function SellerCenterPage() {
  const navigate = useNavigate();
  const [openConfrim, setOpenConfirm] = useRecoilState(ConfirmOpen);
  const [pid, setPid] = useState('');
  const selectId = (e) => {
    console.log(e.currentTarget.id);
    setPid(parseInt(e.currentTarget.id))
  }

  const getSellerProducts = async () => {
    return normalAxios.get('/seller/');
  };

  const { isPending, isError, data, error, isSuccess, refetch} = useQuery({
    queryKey: ['seller_prodcut'],
    queryFn: getSellerProducts,
    refetchOnWindowFocus: false,
  });


  const deletePrdocut = useMutation({
    mutationFn: () => {
      return normalAxios.delete(`/products/${parseInt(pid)}/`);
    },
    onSuccess : (data) => {
      if(data.status === 204) {
        setOpenConfirm(false);
        refetch();
      }
    },
    onError : (e) => {console.log(e.message)},
  })

  const editProduct = () => {

  }
  return (
    <SellerLayout>
      <ComfirmModal content="상품을 삭제하시겠습니까?" btnFn={() =>deletePrdocut.mutate()}></ComfirmModal>
      {data ?
      <Table>
        <thead>
          <TrStyle>
            <ThStyle $first={'true'}>상품정보</ThStyle>
            <ThStyle $second={'true'}>판매가격</ThStyle>
            <ThStyle $third={'true'}>수정</ThStyle>
            <ThStyle $fourth={'true'}>삭제</ThStyle>
          </TrStyle>
        </thead>
        <tbody>
          {data.data.results.map((ele) => {
            return(
              <TrStyle id={ele.product_id} key={ele.product_id} onClick={selectId}>
                <TdStyle $first={'true'}>
                  <FlexItem>
                    <ProductImg src={ele.image} alt={ele.product_name + "썸네일"} />
                    <div>
                      <ProdcutNameP>{ele.product_name}</ProdcutNameP>
                      <StockP>재고: <span id="stock">{ele.stock.toLocaleString()}</span>개</StockP>
                    </div>
                  </FlexItem>
                </TdStyle>
                <TdStyle $second={'true'}><PriceSpan>{ele.price.toLocaleString()}</PriceSpan>원</TdStyle>
                <TdStyle $third={'true'}><S_btn btnFn={(e) => navigate(`/edit/${ele.product_id}`)}>수정</S_btn></TdStyle>
                <TdStyle $fourth={'true'}><S_btn_white btnFn={() => setOpenConfirm(true)}>삭제</S_btn_white></TdStyle>
              </TrStyle>
            )
          })}
        </tbody>
      </Table>
      : 
      <NoCont>등록된 상품이 없습니다.</NoCont>
      }
    </SellerLayout>
  )
}
