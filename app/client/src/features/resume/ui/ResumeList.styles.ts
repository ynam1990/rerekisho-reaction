import styled, { css } from 'styled-components';
import { boxShadow, postItStickLeft } from '@/shared/styles/mixins';
import { pickWhite } from '@/shared/utils/style';
import { Heading } from '@/shared/ui/atoms';

export const ResumeListWrapper = styled.div`
  min-width: 320px;
  width: min(600px, 90%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${ boxShadow }
  
  ${ ({ theme }) => {
    return css`
      background-color: ${ pickWhite(theme) };

      padding: ${ theme.spacing.lg.pc } ${ theme.spacing.lg.pc };
      row-gap: ${ theme.spacing.lg.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        padding: ${ theme.spacing.lg.pc } ${ theme.spacing.lg.pc };
        row-gap: ${ theme.spacing.lg.sp };
      }
    `;
  } }
`;

export const ResumeListRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px ${ ({ theme }) => theme.color.borderGray };
  cursor: pointer;

  &:hover {
    opacity: ${ ({ theme }) => theme.opacity.hover };
  }

  ${ ({ theme }) => {
    return css`
      min-height: ${ theme.typography.fontSize.xxxl.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        min-height: ${ theme.typography.fontSize.xxxl.sp };
      }
    `;
  } }
`;

export const ResumeName = styled.div`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  line-height: ${ ({ theme }) => theme.typography.lineHeight.none.pc };

  ${ ({ theme }) => {
    return css`
      column-gap: ${ theme.spacing.xxs.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        column-gap: ${ theme.spacing.xxs.sp };
      }
    `;
  } }
`;

export const ResumeItemMenuContent = styled.div`
  background-color: ${ ({ theme }) => pickWhite(theme) };
  ${ boxShadow }
  ${ postItStickLeft }

  ${ ({ theme }) => {
    return css`
      padding: ${ theme.spacing.lg.pc } ${ theme.spacing.lg.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        padding: ${ theme.spacing.lg.sp } ${ theme.spacing.lg.sp };
      }
    `;
  } }
`;

export const ResumeListTopRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledHeading = styled(Heading)`
  font-weight: normal;
`;

export const PublishedImg = styled.img`
  ${ ({ theme }) => {
    return css`
      height: ${ theme.typography.fontSize.xxl.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        height: ${ theme.typography.fontSize.xxl.sp };
      }
    `;
  } }
`;
