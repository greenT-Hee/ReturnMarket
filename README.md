# Retrun Market(open market)

### 🔗 <a href="https://d2z06y6p7kswpz.cloudfront.net/">페이지 바로가기</a>
<b>테스트 계정</b><br/>
(핀매자) returnS/1234qwer!<br/>
(구매자) returnB/1234qwer!
<br/>
<br/>
## 🎾 개요
> 테니스 라켓, 유니폼 등 각종 브랜드의 장비을 판매하는 REST API 기반 오픈마켓 서비스입니다. 

공용 API를 사용함으로 테니스 용품 외 상품이 게시될 수 있습니다.
- 권한 별 회원가입을 통해 로그인/로그아웃이 가능합니다. 
- (구매자) 상품목록, 상품상세, 장바구니, 주문 및 주문 내역
- (판매자) 등록 상품목록, 상품 등록/수정/삭제

<br />

## 🩶 목표
- React를 라이브러리를 사용하여 회원가입 및 로그인을 기능 구현
- 오롯이 혼자 API를 POST, GET요청을 통해 CRUD 구현해보기 
- Redux를 사용하여 props 지옥에서 벗어나서 상태관리하기 

<br />

## ⚙ 개발환경 
- 개발 기간: 2024.06. (3주)
- 스택: React.js, Vite, Axios, Recoil, React-Query ,styled-component
- 버전관리: Github
- 디자인: Figma
- 배포: AWS S3, CloudFront

<br />

## 🛒 구현 기능 및 시현 

### ✔️ 권한/인증
#### 1. 로그인/로그아웃
- 아이디/비밀번호는 필수 입력 사항이며, 모두 입력해야 로그인 버튼이 활성화됩니다.
- 로그인 성공시, 상품 목록 화면으로 돌아갑니다.
- 로그아웃 성공시, 모든 쿠키/로컬스토리지가 삭제됩니다.

<img src="https://github.com/greenT-Hee/ReturnMarket/assets/101693495/f90a7a24-5d4f-4e08-b42c-49bc8ce5e5e2" width="550px"/>


#### 2. 회원가입
- 판매자/구매자 권한을 선택합니다.
- 모든 입력이 완료하고 동의하기 체크를 눌러야 버튼 회원가입 버튼이 활성화됩니다.
- 아이디는 중복 확인 버튼을 통해 중복 검사를 실행합니다. 
- 유효성 겁사를 통해, 올바른 형식으로 작성하지 않으면 오류 문구가 입력란 아래에 출력됩니다.
<img src="https://github.com/greenT-Hee/ReturnMarket/assets/101693495/14a3bb99-7811-42cc-8af2-91b59925a24f" width="550px"/>

<br/>

### ✔️ 구매자
#### 1. 상품목록 화면
- 상품을 클릭하면 상품 상세 페이지로 넘아갑니다.
- 상품 판매자, 상품명, 가격들을 확인할 수 있습니다.

<img src="https://github.com/greenT-Hee/ReturnMarket/assets/101693495/7f92e2d4-1bef-4a4b-b1cf-e3a432aebf4d" width="550px"/>


#### 2. 상품 상세  
- `+`와 `-` 버튼으로 구매 수량을 변경할 수 있습니다. 
- 수량을 재고만큼만 구매할 수 있고, 재고를 초과하면 `+`버튼이 비활성화 됩니다. 
- 선택된 수량만큼 가격이 자동 계산되어 보여집니다.
- 구매 버튼을 누르면 결제 페이지로 넘어갑니다.
- 장바구니 버튼을 누르면 상품이 카트에 담기고 장바구니 페이지로 넘아갑니다.

<img src="https://github.com/greenT-Hee/ReturnMarket/assets/101693495/a239ba20-3df3-4798-a05e-8cdf47dc138a" width="550px"/>

#### 3 장바구니
- 장바구니에 담은 상품 정보를 알 수 있습니다.
- 개별 상품 또는 전체 상품 구매가 가능합니다.
- 수량 옵션을 수정할 수 있습니다.

<img src="https://github.com/greenT-Hee/ReturnMarket/assets/101693495/504385e8-9c56-4a2d-8bbe-1c2cb047da32" width="550px"/>

#### 4. 상품 결제
- 주문인/수령인 필수 정보를 입력해야 합니다.
- 결제하기 버튼을 누르면 결제가 진행되고, 주문 내역 페이지로 넘아갑니다.

<img src="https://github.com/greenT-Hee/ReturnMarket/assets/101693495/6a41973a-1d40-4c42-8f44-cee4096a5656" width="550px"/>


#### 5. 주문 내역/주문 상세 
- 결제 상태, 결제 일시, 주문 번호, 주문 수량, 결제 금액 이력을 확인할 수 있습니다.
- 구매한 상품을 다시 장바구니 버튼을 클릭하여 재구매가 가능합니다.
- 주문내역 상세 페이지로 이동할 수 있습니다.

<img src="https://github.com/greenT-Hee/ReturnMarket/assets/101693495/988c02a4-8f5c-4cff-89a0-d0dd11cad22f" width="550px"/>

### ✔️ 판매자
#### 1. 판매자 센터
- 본인이 업로드한 상품 목록을 확인할 수 있습니다.
- 삭제 버튼을 누르면 상품이 삭제됩니다.
- 수정 버튼을 누르면 수정 페이지로 이동합니다.

<img src="https://github.com/greenT-Hee/ReturnMarket/assets/101693495/68d61cd7-d792-4f4d-881d-981534fdd6a5" width="550px"/>

#### 2. 상품 업로드
- 상품 사진, 상품명, 가격, 수량, 배송비, 배송방법, 상품상세를 입력하고 업로드합니다.
- 취소 버튼을 누르면 다시 판매자 센터로 이동합니다.
- 
<img src="https://github.com/greenT-Hee/ReturnMarket/assets/101693495/229638b6-21d2-4869-a0cc-fc30f75967e8" width="550px"/>

#### 3. 상품 수정
- 상품 업로드한 내용이 나타납니다.
- 상품명, 사진, 가격, 수량, 배송비, 배송방법, 상품 상세 내용을 수정할 수 있습니다.

<img src="https://github.com/greenT-Hee/ReturnMarket/assets/101693495/aca97665-9d6c-4941-92f4-492bc1b23afb" width="550px"/>
