import React, { memo, useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import Svg, { G, Path, Line } from 'react-native-svg';

import { svgTermometro } from 'helpers/svgTermometroChart';
import i18n from 'components/i18n';

const ChartSvg = ({ data, type }) => {

    const [dataChart, setDataChart] = useState(false); // estado para controlar modal open / close

    // settings svg 
    useEffect(() => {
        svgTermometro.map((char) => { data >= char.pocent && setDataChart(char) }) //passando a posentagem do svg, sendo que 100% do grafico a total das 20 parte do grafico
    }, [data])

    return (
        <View >
            <Svg width="250.000000pt" height="200.000000pt" viewBox="50 0 300.000000 400.000000">
                <G transform="translate(0.000000,400.000000) scale(0.100000,-0.100000)" fill="#000000" >

                    {/* Desenho do grafico */}
                    {svgTermometro.map((char, index) => {
                        return (
                            <Path
                                key={index}
                                fill={data >= char.pocent ? char.fill : '#000000'} //pintando o grafico confome o valo
                                d={char.d}
                            />
                        )
                    })}

                    {/* Linha para legenda de porcentagem  */}
                    <Line
                        stroke={dataChart.fill} //cor da linha 
                        y2={dataChart.positLine} // posição de linha. Y2 ponto inical da linha (esquerda) 
                        y1={dataChart.positLine} // posição de linha. Y1 ponto final da linha (direita)
                        x2="1500" x1="4000" strokeWidth="25" />

                    {/* não tem importancia para o grafico */}
                    <Path fill="#dadada" d="M880 1543 c-14 -2 -71 -15 -127 -29 -56 -13 -121 -25 -145 -27 -23 -2 -50 -6 -58 -9 -8 -3 -49 -11 -90 -17 -41 -7 -78 -15 -82 -19 -11 -11 56 -53 103 -63 36 -8 201 -4 218 5 3 2 30 0 59 -3 38 -6 55 -4 63 6 7 7 22 13 36 13 43 0 73 28 73 69 0 42 -10 82 -19 80 -3 -1 -17 -4 -31 -6z" />
                    <Path fill="#dadada" d="M795 1160 c-26 -12 -64 -19 -107 -19 -38 -1 -68 -5 -68 -9 0 -13 41 -47 74 -60 38 -17 173 -13 209 5 23 12 27 20 27 58 l0 45 -47 -1 c-27 0 -66 -9 -88 -19z" />
                    <Path fill="#dadada" d="M889 856 c-3 -3 -25 -6 -49 -7 -25 -1 -88 -8 -140 -16 -52 -8 -138 -18 -190 -22 -131 -10 -151 -25 -82 -60 62 -31 116 -37 377 -41 57 -1 125 43 125 80 0 53 -21 86 -41 66z" />
                </G>
            </Svg>


            <View style={{
                position: 'absolute',
                marginLeft: 150,
                marginTop: dataChart.postiPocent
            }} >
                <Text style={{
                    color: dataChart.fill,
                    fontSize: 45,
                    fontFamily: 'Lato_400Regular'
                }}>{data}
                    <Text style={{ fontSize: 30, fontFamily: 'Lato_300Light' }}>%</Text>
                </Text>
            </View >

            {/* Legenda */}
            <View style={{ flexDirection: 'row', padding: 15 }}>
                <View style={{ marginRight: 5 }}>

                    <Text style={{
                        marginTop: 10,
                        textAlign: 'center',
                        color: dataChart.fill,
                        fontSize: 15,
                        fontFamily: 'Lato_400Regular'
                    }}>{dataChart.text}</Text>
                </View >
                <Text style={{
                    color: dataChart.fill,
                    fontSize: 15,
                    fontFamily: 'Lato_400Regular'
                }}>{type === 'active' ? i18n.t('transparency_subtitle_active') : i18n.t('transparency_subtitle_passive')}</Text>
            </View >
        </View >
    )
}

export default memo(ChartSvg)
