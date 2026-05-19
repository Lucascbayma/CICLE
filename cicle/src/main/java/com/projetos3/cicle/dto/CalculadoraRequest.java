package com.projetos3.cicle.dto;

public class CalculadoraRequest {
    private int volumeTransacoes;
    private double percentualDigital;
    private double percentualReciclado;

    public int getVolumeTransacoes() { return volumeTransacoes; }
    public void setVolumeTransacoes(int volumeTransacoes) { this.volumeTransacoes = volumeTransacoes; }
    public double getPercentualDigital() { return percentualDigital; }
    public void setPercentualDigital(double percentualDigital) { this.percentualDigital = percentualDigital; }
    public double getPercentualReciclado() { return percentualReciclado; }
    public void setPercentualReciclado(double percentualReciclado) { this.percentualReciclado = percentualReciclado; }
}