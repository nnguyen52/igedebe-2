import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Content from './Content';
import CustomButton from '../customButton';
import SideContent from './SideContent';

const AdditionalDetails = ({ game }) => {
  // sm — screen width ≥ 576px
  // md — screen width ≥ 768px
  // lg — screen width ≥ 992px
  if (game === undefined) return <> </>;
  return (
    <div className="additional_detail">
      <Row>
        <Col lg={2} md={2} sm={12}>
          <div className="nav">
            <ul>
              <li>
                <CustomButton content="Quick info" routing="#quick_info" />
              </li>
              {game.storyline && (
                <li>
                  <CustomButton content="Storyline" routing="#storyline" />
                </li>
              )}
              <li>
                <CustomButton content="Similars" routing="#recommendations" />
              </li>
            </ul>
          </div>
        </Col>
        <Col lg={7} md={7} sm={12} className="col_content">
          <div className="content">
            <Content game={game} />
          </div>
        </Col>
        <Col lg={3} md={3} sm={12} className="col_side_content">
          <div className="side_content">
            <SideContent game={game} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AdditionalDetails;
