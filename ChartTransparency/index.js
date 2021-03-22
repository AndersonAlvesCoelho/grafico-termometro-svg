import React, { useState } from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import colors from 'styles/colors'
import pagination from 'styles/pagination'
import indicators from 'styles/indicators'
import ChartSvg from 'components/Charts/ChartTransparency/chartSvg'
import Modalnformation from 'components/Modal/modalnformation' // Modal do itens dinamico
import i18n from 'components/i18n'
import PaginationCharts from 'components/Charts/paginationCharts'

const ChartTransparency = ({ dataChart }) => {
  const [show, setShow] = useState(false) // estado para controlar modal open / close
  const [nameModal, setNameModal] = useState('');
  const [textModal, setTextModal] = useState('');
  const [viewChart, setViewChart] = useState(1)


  return (
    <View >
      <TouchableHighlight
        onPress={() => { setShow(true); setNameModal(dataChart.name); setTextModal("Texto sobre o indicador de trasnparencia") }}
      >
        <View style={indicators.containerTitle}>
          <Text style={indicators.title}>{dataChart.name}</Text>
          <MaterialIcons name="info-outline" color={colors.darkOrange} size={25} />
        </View>
      </TouchableHighlight>

      <View >

        {/* Pagginação de graficos */}
        <PaginationCharts
          totalChart={2} // total de gráfico  a serem visualizados
          previous={() => setViewChart(viewChart - 1)} // gráfico  anterior
          next={() => setViewChart(viewChart + 1)} // proximo gráfico
        />

        <View style={pagination.containerMenu}>
          <Text style={{ color: colors.light, borderBottomWidth: 2, borderColor: viewChart === 1 ? colors.darkOrange : colors.darkGree }}>{i18n.t('active')}</Text>
          <Text style={{ color: colors.light, borderBottomWidth: 2, borderColor: viewChart === 2 ? colors.darkOrange : colors.darkGree }}>{i18n.t('passive')}</Text>
        </View >

        <TouchableHighlight
          onPress={() => {
            setShow(true);
            setNameModal(viewChart === 1 ? i18n.t('active') : i18n.t('passive'));
            setTextModal("Texto sobre o indicador de trasnparencia");
          }}
        >
          <View>
            <Text style={{ textAlign: 'right' }}>
              <MaterialIcons name="info-outline" color={colors.yellow} size={25} />
            </Text>
          </View>
        </TouchableHighlight>

        {viewChart === 1 && (<>
          <ChartSvg data={dataChart.active} type="active" />
        </>)}

        {viewChart === 2 && (<>
          <ChartSvg data={dataChart.passive} type="passive" />
        </>)}


      </View>

      {/* Modal que contem texto sobre o item seleciondo */}
      <Modalnformation
        title={nameModal}
        text={textModal}
        show={show}
        close={() => setShow(false)}
      />
    </View>
  )
}

export default ChartTransparency
