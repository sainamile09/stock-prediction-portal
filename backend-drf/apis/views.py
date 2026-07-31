from django.shortcuts import render
from .stockSerializer import stockSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt 
from datetime import datetime
from .utils import save_plot



# Create your views here.

class stockPredictApiView(APIView):
    def post(self,request):
        serializers = stockSerializer(data = request.data)
        if serializers.is_valid():
            ticker = serializers.validated_data['ticker']
            now = datetime.now()
            start = datetime(now.year - 10 , now.month,now.day)
            end = now
            df = yf.download(ticker,start,end)
            if df.empty:
                return Response({'error':"No data found on this ticker",'status':status.HTTP_400_BAD_REQUEST})
            df = df.reset_index()
            plt.switch_backend('AGG')

            plt.figure(figsize=(12,5))
            plt.plot(df.Close,label='Closing Price')
            plt.title(f'closing price of {ticker}')
            plt.xlabel('Days')
            plt.ylabel('Closing Price')
            plt.legend()
            image_url = save_plot(f'{ticker}plot.png')

            ma100 = df.Close.rolling(100).mean()
            plt.figure(figsize=(12,5))
            plt.plot(df.Close,label='Closing Price')
            plt.plot(ma100,'r',label='100 DMA')
            plt.title(f'closing price of {ticker} with 100DMA')
            plt.xlabel('Days')
            plt.ylabel('Closing Price')
            plt.legend()
            image_url_100MA = save_plot(f'{ticker}plot_100MA.png')

            ma200 = df.Close.rolling(200).mean()
            plt.figure(figsize=(12,5))
            plt.plot(df.Close,label='Closing Price')
            plt.plot(ma200,'r',label='200 DMA')
            plt.title(f'closing price of {ticker} with 200DMA')
            plt.xlabel('Days')
            plt.ylabel('Closing Price')
            plt.legend()
            image_url_200MA = save_plot(f'{ticker}plot_200MA.png')

            return Response({'status':'success','ticker':ticker,'plot_img':image_url,'plot_img_100MA':image_url_100MA,'plot_img_200MA':image_url_200MA})





