import styled, { css } from 'styled-components'
import { pickWhite } from '@/shared/utils/style';

type Props = {
  name: string;
  value: { year: string; month: string };
  onChange: (newValue: { year: string; month: string, dateString: string }) => void;
  dataYear?: any;
  dataMonth?: any;
};

export const MonthInput = (props: Props) => {
  const {
    name,
    value,
    onChange,
    dataYear,
    dataMonth,
  } = props;


  const handleOnChange = (month: string, year: string) => {
    onChange({
      year: year,
      month: month,
      dateString: year && month ? `${ year }-${ month.padStart(2, '0') }-01` : '',
    });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = e.target.value;
    handleOnChange(value.month, newYear);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = e.target.value;
    handleOnChange(newMonth, value.year);
  };
  
  return (
    <MonthInputWrapper>
      <StyledSelect name={ name + '_year' } onChange={handleYearChange} value={value.year} { ...dataYear }>
        { YEAR_SELECT_LIST }
      </StyledSelect>
      <StyledSelect name={ name + '_month' } onChange={handleMonthChange} value={value.month} { ...dataMonth }>
        { MONTH_SELECT_LIST }
      </StyledSelect>
    </MonthInputWrapper>
  );
};

const YEAR_SELECT_LIST: React.ReactNode[] = [
  <option
    key={ '' }
    value={ '' }
  >
    年選択
  </option>
];
const currentYear = new Date().getFullYear();
for (let year = (currentYear + 5); year >= (currentYear - 95); year--) {
  YEAR_SELECT_LIST.push(
    <option
      key={ year }
      value={ year }
    >
      { year }年
    </option>
  );
};

const MONTH_SELECT_LIST: React.ReactNode[] = [
  <option
    key={ '' }
    value={ '' }
  >
    月選択
  </option>
];
for (let month = 1; month <= 12; month++) {
  MONTH_SELECT_LIST.push(
    <option
      key={ month }
      value={ month }
    >
      { month }月
    </option>
  );
};

const MonthInputWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: ${ ({ theme }) => theme.spacing.xxs.pc };

  @media (max-width: ${ ({ theme }) => theme.breakpoints.sp}) {
    column-gap: ${ ({ theme }) => theme.spacing.xxs.sp };
  }
`;

const StyledSelect = styled.select`
  outline-color: ${ ({ theme }) => theme.color.primary };
  color: ${ ({ theme }) => theme.color.tertiary };
  background-color: ${ ({ theme }) => pickWhite(theme) };

  ${ ({ theme }) => {
    const { typography, spacing } = theme;
    const { fontSize, lineHeight, letterSpacing } = typography;

    return css`
      font-size: ${ fontSize.md.pc };
      letter-spacing: ${ letterSpacing.body.pc };
      line-height: ${ lineHeight.tight.pc };
      padding: ${ `${ spacing.xs.pc } ${ spacing.xs.pc }` };
      
      @media (max-width: ${ theme.breakpoints.sp}) {
        font-size: ${ fontSize.md.sp };
        letter-spacing: ${ letterSpacing.body.sp };
        line-height: ${ lineHeight.tight.sp };
        padding: ${ `${ spacing.xs.sp } ${ spacing.xs.sp }` };
      }
    `;
  } }

  border-radius: ${ ({ theme }) => theme.radius.md };
  border: solid 2px ${ ({ theme }) => theme.color.paleGray };

  &> option {
    text-align: center;
  }
`;
