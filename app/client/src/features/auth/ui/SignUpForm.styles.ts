import styled, { css } from 'styled-components';
import { pickWhite } from '@/shared/utils/style';
import { Label } from '@/shared/ui/atoms/Label';
import { Input } from '@/shared/ui/atoms/Input';
import { boxShadow } from '@/shared/styles/mixins';
import { Heading } from '@/shared/ui/atoms/Heading';

export const SignUpFormWrapper = styled.div`
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

      padding: ${ theme.spacing.lg.pc } ${ theme.spacing.md.pc };
      row-gap: ${ theme.spacing.lg.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        padding: ${ theme.spacing.lg.pc } ${ theme.spacing.md.pc };
        row-gap: ${ theme.spacing.lg.sp };
      }
    `;
  } }
`;

export const StyledHeading = styled(Heading)`
  color: ${ ({ theme }) => theme.color.secondary };

  ${ ({ theme }) => {
    return css`
      margin: ${ theme.spacing.xl.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        margin: ${ theme.spacing.xl.sp };
      }
    `;
  } }
`;

export const StyledSignUpForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  ${ ({ theme }) => {
    return css`
      row-gap: ${ theme.spacing.md.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        row-gap: ${ theme.spacing.md.sp };
      }
    `;
  } }
`;

export const StyledLabel = styled(Label)`
  width: 100%;
`;

export const StyledInput = styled(Input)`
  width: 100%;
`;

export const FormFooterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;

  ${ ({ theme }) => {
    return css`
      padding-top: ${ theme.spacing.md.pc };
      row-gap: ${ theme.spacing.md.pc };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        padding-top: ${ theme.spacing.md.sp };
        row-gap: ${ theme.spacing.md.sp };
      }
    `;
  } }
`;
